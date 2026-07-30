import type { Db } from "@sf/db";
import { z } from "zod";
import {
  conflict,
  type DomainError,
  notFound,
  unauthorized,
  validationError,
} from "../../shared/errors";
import { hashPassword, verifyPassword } from "../../shared/password";
import { err, ok, type Result } from "../../shared/result";
import { ALLOWED_TRANSITIONS } from "../orders/order-status";
import type { OrdersService } from "../orders/orders.service";
import type { AdminRepo } from "./admin.repo";
import type { StoreType } from "./admin.schemas";
import {
  adjustInventorySchema,
  adminCategorySchema,
  adminLoginSchema,
  adminPageSchema,
  adminSetupSchema,
  adminStoreSchema,
  bulkAdminStoresSchema,
  createAdminProductSchema,
  transitionOrderSchema,
  updateAdminCategorySchema,
  updateAdminCustomerSchema,
  updateAdminProductSchema,
  updateAdminStoreSchema,
} from "./admin.schemas";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const parse = <T>(schema: z.ZodType<T>, input: unknown): Result<T, DomainError> => {
  const result = schema.safeParse(input);
  return result.success
    ? ok(result.data)
    : err(validationError("Validation failed", result.error.issues));
};

export type AdminServiceDeps = {
  db: Db;
  adminRepo: AdminRepo;
  ordersService: OrdersService;
};

export const createAdminService = (deps: AdminServiceDeps) => {
  const isSetupRequired = async () => {
    const exists = await deps.adminRepo.hasAdmin(deps.db);
    return ok({ isRequired: !exists });
  };

  const setup = async (input: unknown, configuredSecret?: string) => {
    const parsed = parse(adminSetupSchema, input);
    if (!parsed.ok) return parsed;

    const secretToMatch =
      configuredSecret ||
      (typeof process !== "undefined" ? process.env.ADMIN_SETUP_SECRET : undefined) ||
      "sandur-admin-setup-secret";
    if (parsed.value.secret !== secretToMatch) {
      return err(unauthorized("Invalid setup secret"));
    }

    const alreadyExists = await deps.adminRepo.hasAdmin(deps.db);
    if (alreadyExists) {
      return err(conflict("Admin account is already configured"));
    }

    const passwordHash = await hashPassword(parsed.value.password);
    const { user, credential } = await deps.db.transaction((tx) =>
      deps.adminRepo.createAdminWithCredential(tx, {
        phone: parsed.value.phone,
        name: parsed.value.name,
        email: parsed.value.email,
        passwordHash,
      }),
    );

    const token = crypto.randomUUID() + crypto.randomUUID().replaceAll("-", "");
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    await deps.adminRepo.createSession(deps.db, { userId: user.id, token, expiresAt });

    return ok({
      token,
      expiresAt,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: credential.email,
        role: user.role,
      },
    });
  };

  const login = async (input: unknown) => {
    const parsed = parse(adminLoginSchema, input);
    if (!parsed.ok) return parsed;
    const row = await deps.adminRepo.findCredentialByEmail(deps.db, parsed.value.email);
    console.log("data", row);
    if (row?.user.role !== "admin") {
      return err(unauthorized("Invalid email or password"));
    }
    if (!(await verifyPassword(parsed.value.password, row.credential.passwordHash))) {
      return err(unauthorized("Invalid email or password"));
    }
    const token = crypto.randomUUID() + crypto.randomUUID().replaceAll("-", "");
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    await deps.adminRepo.createSession(deps.db, { userId: row.user.id, token, expiresAt });
    return ok({
      token,
      expiresAt,
      user: {
        id: row.user.id,
        phone: row.user.phone,
        name: row.user.name,
        email: row.credential.email,
        role: row.user.role,
      },
    });
  };

  const logout = async (token: string) => {
    await deps.adminRepo.revokeSession(deps.db, token);
    return ok(true);
  };

  const dashboard = async () => ok(await deps.adminRepo.dashboard(deps.db));

  const listProducts = async (input: unknown) => {
    const parsed = parse(adminPageSchema, input);
    if (!parsed.ok) return parsed;
    const result = await deps.adminRepo.listProducts(deps.db, parsed.value);
    return ok({ ...result, page: parsed.value.page, limit: parsed.value.limit });
  };

  const getProduct = async (id: string) => {
    const product = await deps.adminRepo.findProduct(deps.db, id);
    return product ? ok(product) : err(notFound("Product not found"));
  };

  const createProduct = async (input: unknown) => {
    const parsed = parse(createAdminProductSchema, input);
    if (!parsed.ok) return parsed;
    const product = await deps.db.transaction((tx) =>
      deps.adminRepo.createProduct(tx, parsed.value),
    );
    return getProduct(product.id);
  };

  const updateProduct = async (id: string, input: unknown) => {
    const parsed = parse(updateAdminProductSchema, input);
    if (!parsed.ok) return parsed;
    const existing = await deps.adminRepo.findProduct(deps.db, id);
    if (!existing) return err(notFound("Product not found"));
    const price = parsed.value.price ?? existing.price;
    const mrp = parsed.value.mrp ?? existing.mrp;
    if (price > mrp) return err(validationError("price must be less than or equal to mrp"));
    await deps.adminRepo.updateProduct(deps.db, id, parsed.value);
    return getProduct(id);
  };

  const createCategory = async (input: unknown) => {
    const parsed = parse(adminCategorySchema, input);
    return parsed.ok ? ok(await deps.adminRepo.createCategory(deps.db, parsed.value)) : parsed;
  };

  const updateCategory = async (id: string, input: unknown) => {
    const parsed = parse(updateAdminCategorySchema, input);
    if (!parsed.ok) return parsed;
    const category = await deps.adminRepo.updateCategory(deps.db, id, parsed.value);
    return category ? ok(category) : err(notFound("Category not found"));
  };

  const createStore = async (input: unknown) => {
    const parsed = parse(adminStoreSchema, input);
    if (!parsed.ok) return parsed;
    return ok(await deps.db.transaction((tx) => deps.adminRepo.createStore(tx, parsed.value)));
  };

  const createStoresBulk = async (input: unknown) => {
    const parsed = parse(bulkAdminStoresSchema, input);
    if (!parsed.ok) return parsed;
    return ok(await deps.db.transaction((tx) => deps.adminRepo.createStoresBulk(tx, parsed.value)));
  };

  const updateStore = async (id: string, input: unknown) => {
    const parsed = parse(updateAdminStoreSchema, input);
    if (!parsed.ok) return parsed;
    const store = await deps.adminRepo.updateStore(deps.db, id, parsed.value);
    return store ? ok(store) : err(notFound("Store not found"));
  };

  const adjustInventory = async (adminId: string, input: unknown) => {
    const parsed = parse(adjustInventorySchema, input);
    if (!parsed.ok) return parsed;
    const adjusted = await deps.db.transaction((tx) =>
      deps.adminRepo.adjustInventory(tx, { ...parsed.value, adjustedBy: adminId }),
    );
    if (!adjusted) {
      return err(conflict("Inventory not found or adjustment would make stock negative"));
    }
    const inventory = await deps.adminRepo.findInventory(deps.db, adjusted.id);
    return inventory ? ok(inventory) : err(notFound("Inventory not found"));
  };

  const listInventory = async (input: unknown) => {
    const schema = adminPageSchema.extend({
      storeId: z.string().min(1),
      lowStockOnly: z.boolean().default(false),
    });
    const parsed = parse(schema, input);
    if (!parsed.ok) return parsed;
    const result = await deps.adminRepo.listInventory(deps.db, parsed.value);
    return ok({ ...result, page: parsed.value.page, limit: parsed.value.limit });
  };

  const listOrders = async (input: unknown) => {
    const schema = adminPageSchema.omit({ query: true }).extend({
      status: transitionOrderSchema.shape.status.optional(),
    });
    const parsed = parse(schema, input);
    if (!parsed.ok) return parsed;
    const result = await deps.adminRepo.listOrders(deps.db, parsed.value);
    return ok({
      ...result,
      items: result.items.map((order) => ({
        ...order,
        allowedNextStatuses: ALLOWED_TRANSITIONS[order.status],
      })),
      page: parsed.value.page,
      limit: parsed.value.limit,
    });
  };

  const getOrder = async (id: string) => {
    const order = await deps.adminRepo.findOrder(deps.db, id);
    return order
      ? ok({ ...order, allowedNextStatuses: ALLOWED_TRANSITIONS[order.status] })
      : err(notFound("Order not found"));
  };

  const transitionOrder = async (adminId: string, input: unknown) => {
    const parsed = parse(transitionOrderSchema, input);
    if (!parsed.ok) return parsed;
    const result = await deps.ordersService.updateStatus(
      parsed.value.orderId,
      parsed.value.status,
      adminId,
      parsed.value.reason,
    );
    if (!result.ok) return result;
    return getOrder(parsed.value.orderId);
  };

  const listCustomers = async (input: unknown) => {
    const parsed = parse(adminPageSchema, input);
    if (!parsed.ok) return parsed;
    const result = await deps.adminRepo.listCustomers(deps.db, parsed.value);
    return ok({ ...result, page: parsed.value.page, limit: parsed.value.limit });
  };

  const getCustomer = async (id: string) => {
    const customer = await deps.adminRepo.findCustomer(deps.db, id);
    return customer ? ok(customer) : err(notFound("Customer not found"));
  };

  const updateCustomer = async (id: string, input: unknown) => {
    const parsed = parse(updateAdminCustomerSchema, input);
    if (!parsed.ok) return parsed;
    const existing = await deps.adminRepo.findCustomer(deps.db, id);
    if (!existing) return err(notFound("Customer not found"));
    const updated = await deps.adminRepo.updateCustomer(deps.db, id, parsed.value);
    return updated ? ok(updated) : err(notFound("Customer not found"));
  };

  return {
    isSetupRequired,
    setup,
    login,
    logout,
    dashboard,
    listProducts,
    getProduct,
    listCategories: async () => ok(await deps.adminRepo.listCategories(deps.db)),
    listStores: async (filter?: { type?: StoreType }) =>
      ok(await deps.adminRepo.listStores(deps.db, filter)),
    getStore: async (id: string) => {
      const store = await deps.adminRepo.findStore(deps.db, id);
      return store ? ok(store) : err(notFound("Store not found"));
    },
    listInventory,
    listOrders,
    getOrder,
    listCustomers,
    getCustomer,
    updateCustomer,
    createProduct,
    updateProduct,
    createCategory,
    updateCategory,
    createStore,
    createStoresBulk,
    updateStore,
    adjustInventory,
    transitionOrder,
  };
};

export type AdminService = ReturnType<typeof createAdminService>;
