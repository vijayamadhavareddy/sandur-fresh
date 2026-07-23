import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { env, isProduction } from "../../config/env";
import type { OrderStatus } from "../../modules/orders/order-status";
import { toGraphQLError } from "../../shared/errors";
import type { GraphQLContext } from "../context";
import { fromServiceResult, requireUser } from "../helpers";

const requireAdmin = (ctx: GraphQLContext) => {
  const user = requireUser(ctx);
  if (user.role !== "admin") {
    throw toGraphQLError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return user;
};

const OrderStatusType = new GraphQLEnumType({
  name: "AdminOrderStatus",
  values: {
    PLACED: { value: "PLACED" },
    PACKED: { value: "PACKED" },
    OUT_FOR_DELIVERY: { value: "OUT_FOR_DELIVERY" },
    DELIVERED: { value: "DELIVERED" },
    CANCELLED: { value: "CANCELLED" },
  },
});

const AdminUserType = new GraphQLObjectType({
  name: "AdminUser",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    role: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const AdminSessionType = new GraphQLObjectType({
  name: "AdminSession",
  fields: {
    user: { type: new GraphQLNonNull(AdminUserType) },
    expiresAt: { type: GraphQLString },
  },
});

const CategoryType = new GraphQLObjectType({
  name: "AdminCategory",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    slug: { type: new GraphQLNonNull(GraphQLString) },
    sortOrder: { type: new GraphQLNonNull(GraphQLInt) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ProductType = new GraphQLObjectType({
  name: "AdminProduct",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    categoryId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    unit: { type: new GraphQLNonNull(GraphQLString) },
    mrp: { type: new GraphQLNonNull(GraphQLInt) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    emoji: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    isActive: { type: new GraphQLNonNull(GraphQLBoolean) },
    category: { type: new GraphQLNonNull(CategoryType) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const StoreType = new GraphQLObjectType({
  name: "AdminStore",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    lng: { type: new GraphQLNonNull(GraphQLFloat) },
    serviceRadiusM: { type: new GraphQLNonNull(GraphQLInt) },
    isActive: { type: new GraphQLNonNull(GraphQLBoolean) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const InventoryType = new GraphQLObjectType({
  name: "AdminInventoryItem",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    storeId: { type: new GraphQLNonNull(GraphQLString) },
    productId: { type: new GraphQLNonNull(GraphQLString) },
    stockQty: { type: new GraphQLNonNull(GraphQLInt) },
    lowStockThreshold: { type: new GraphQLNonNull(GraphQLInt) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
    product: { type: new GraphQLNonNull(ProductType) },
  },
});

const AddressType = new GraphQLObjectType({
  name: "AdminOrderAddress",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    label: { type: new GraphQLNonNull(GraphQLString) },
    line1: { type: new GraphQLNonNull(GraphQLString) },
    line2: { type: GraphQLString },
    city: { type: new GraphQLNonNull(GraphQLString) },
    pincode: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    lng: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const OrderItemType = new GraphQLObjectType({
  name: "AdminOrderItem",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    productId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    unit: { type: new GraphQLNonNull(GraphQLString) },
    unitPrice: { type: new GraphQLNonNull(GraphQLInt) },
    mrp: { type: new GraphQLNonNull(GraphQLInt) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const HistoryType = new GraphQLObjectType({
  name: "AdminOrderStatusHistory",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    fromStatus: { type: OrderStatusType },
    toStatus: { type: new GraphQLNonNull(OrderStatusType) },
    changedBy: { type: GraphQLString },
    reason: { type: GraphQLString },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const OrderType = new GraphQLObjectType({
  name: "AdminOrder",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(OrderStatusType) },
    subtotal: { type: new GraphQLNonNull(GraphQLInt) },
    deliveryFee: { type: new GraphQLNonNull(GraphQLInt) },
    discount: { type: new GraphQLNonNull(GraphQLInt) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
    paymentMethod: { type: new GraphQLNonNull(GraphQLString) },
    placedAt: { type: new GraphQLNonNull(GraphQLString) },
    customer: { type: new GraphQLNonNull(AdminUserType) },
    store: { type: new GraphQLNonNull(StoreType) },
    address: { type: new GraphQLNonNull(AddressType) },
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OrderItemType))) },
    history: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(HistoryType))) },
    allowedNextStatuses: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OrderStatusType))),
    },
  },
});

const DashboardType = new GraphQLObjectType({
  name: "AdminDashboard",
  fields: {
    todaysOrders: { type: new GraphQLNonNull(GraphQLInt) },
    placedOrders: { type: new GraphQLNonNull(GraphQLInt) },
    processingOrders: { type: new GraphQLNonNull(GraphQLInt) },
    lowStockItems: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const ProductsPageType = new GraphQLObjectType({
  name: "AdminProductsPage",
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProductType))) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const InventoryPageType = new GraphQLObjectType({
  name: "AdminInventoryPage",
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(InventoryType))) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const OrdersPageType = new GraphQLObjectType({
  name: "AdminOrdersPage",
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OrderType))) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const iso = (value: Date) => value.toISOString();
const serializeProduct = <
  T extends { createdAt: Date; updatedAt: Date; category: { createdAt: Date } },
>(
  value: T,
) => ({
  ...value,
  category: { ...value.category, createdAt: iso(value.category.createdAt) },
  createdAt: iso(value.createdAt),
  updatedAt: iso(value.updatedAt),
});
const serializeStore = <T extends { createdAt: Date; updatedAt: Date }>(value: T) => ({
  ...value,
  createdAt: iso(value.createdAt),
  updatedAt: iso(value.updatedAt),
});
const serializeOrder = <
  T extends {
    placedAt: Date;
    store: { createdAt: Date; updatedAt: Date };
    history: Array<{ createdAt: Date }>;
  },
>(
  value: T,
) => ({
  ...value,
  placedAt: iso(value.placedAt),
  store: serializeStore(value.store),
  history: value.history.map((entry) => ({ ...entry, createdAt: iso(entry.createdAt) })),
});

export const adminQueries = {
  adminSession: {
    type: AdminSessionType,
    resolve: (_src: unknown, _args: unknown, ctx: GraphQLContext) => {
      if (ctx.user?.role !== "admin") return null;
      return { user: ctx.user, expiresAt: null };
    },
  },
  adminDashboard: {
    type: new GraphQLNonNull(DashboardType),
    resolve: async (_src: unknown, _args: unknown, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      return fromServiceResult(await ctx.services.admin.dashboard());
    },
  },
  adminProducts: {
    type: new GraphQLNonNull(ProductsPageType),
    args: {
      page: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      query: { type: GraphQLString },
    },
    resolve: async (_src: unknown, args: object, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      const page = fromServiceResult(await ctx.services.admin.listProducts(args));
      return { ...page, items: page.items.map(serializeProduct) };
    },
  },
  adminProduct: {
    type: ProductType,
    args: { id: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: async (_src: unknown, args: { id: string }, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      return serializeProduct(fromServiceResult(await ctx.services.admin.getProduct(args.id)));
    },
  },
  adminCategories: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CategoryType))),
    resolve: async (_src: unknown, _args: unknown, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      return fromServiceResult(await ctx.services.admin.listCategories()).map((category) => ({
        ...category,
        createdAt: iso(category.createdAt),
      }));
    },
  },
  adminStores: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(StoreType))),
    resolve: async (_src: unknown, _args: unknown, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      return fromServiceResult(await ctx.services.admin.listStores()).map(serializeStore);
    },
  },
  adminStore: {
    type: StoreType,
    args: { id: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: async (_src: unknown, args: { id: string }, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      return serializeStore(fromServiceResult(await ctx.services.admin.getStore(args.id)));
    },
  },
  adminInventory: {
    type: new GraphQLNonNull(InventoryPageType),
    args: {
      storeId: { type: new GraphQLNonNull(GraphQLString) },
      page: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      query: { type: GraphQLString },
      lowStockOnly: { type: GraphQLBoolean },
    },
    resolve: async (_src: unknown, args: object, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      const page = fromServiceResult(await ctx.services.admin.listInventory(args));
      return {
        ...page,
        items: page.items.map((item) => ({
          ...item,
          updatedAt: iso(item.updatedAt),
          product: serializeProduct(item.product),
        })),
      };
    },
  },
  adminOrders: {
    type: new GraphQLNonNull(OrdersPageType),
    args: {
      page: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      status: { type: OrderStatusType },
    },
    resolve: async (_src: unknown, args: object, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      const page = fromServiceResult(await ctx.services.admin.listOrders(args));
      return { ...page, items: page.items.map(serializeOrder) };
    },
  },
  adminOrder: {
    type: OrderType,
    args: { id: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: async (_src: unknown, args: { id: string }, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      return serializeOrder(fromServiceResult(await ctx.services.admin.getOrder(args.id)));
    },
  },
};

const productArgs = {
  categoryId: { type: GraphQLString },
  name: { type: GraphQLString },
  description: { type: GraphQLString },
  unit: { type: GraphQLString },
  mrp: { type: GraphQLInt },
  price: { type: GraphQLInt },
  emoji: { type: GraphQLString },
  imageUrl: { type: GraphQLString },
  isActive: { type: GraphQLBoolean },
};

export const adminMutations = {
  adminLogin: {
    type: new GraphQLNonNull(AdminSessionType),
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_src: unknown, args: object, ctx: GraphQLContext) => {
      const session = fromServiceResult(await ctx.services.admin.login(args));
      const secure = isProduction ? "; Secure" : "";
      ctx.responseHeaders.append(
        "Set-Cookie",
        `${env.ADMIN_SESSION_COOKIE}=${encodeURIComponent(session.token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${30 * 24 * 60 * 60}${secure}`,
      );
      return { user: session.user, expiresAt: iso(session.expiresAt) };
    },
  },
  adminLogout: {
    type: new GraphQLNonNull(GraphQLBoolean),
    resolve: async (_src: unknown, _args: unknown, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      if (ctx.sessionToken) fromServiceResult(await ctx.services.admin.logout(ctx.sessionToken));
      const secure = isProduction ? "; Secure" : "";
      ctx.responseHeaders.append(
        "Set-Cookie",
        `${env.ADMIN_SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`,
      );
      return true;
    },
  },
  createAdminProduct: {
    type: new GraphQLNonNull(ProductType),
    args: {
      ...productArgs,
      categoryId: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      unit: { type: new GraphQLNonNull(GraphQLString) },
      mrp: { type: new GraphQLNonNull(GraphQLInt) },
      price: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (_src: unknown, args: object, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      return serializeProduct(fromServiceResult(await ctx.services.admin.createProduct(args)));
    },
  },
  updateAdminProduct: {
    type: new GraphQLNonNull(ProductType),
    args: { id: { type: new GraphQLNonNull(GraphQLString) }, ...productArgs },
    resolve: async (_src: unknown, args: { id: string }, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      const { id, ...input } = args;
      return serializeProduct(fromServiceResult(await ctx.services.admin.updateProduct(id, input)));
    },
  },
  createAdminCategory: {
    type: new GraphQLNonNull(CategoryType),
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      slug: { type: new GraphQLNonNull(GraphQLString) },
      sortOrder: { type: GraphQLInt },
    },
    resolve: async (_src: unknown, args: object, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      const value = fromServiceResult(await ctx.services.admin.createCategory(args));
      return { ...value, createdAt: iso(value.createdAt) };
    },
  },
  updateAdminCategory: {
    type: new GraphQLNonNull(CategoryType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      slug: { type: GraphQLString },
      sortOrder: { type: GraphQLInt },
    },
    resolve: async (_src: unknown, args: { id: string }, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      const { id, ...input } = args;
      const value = fromServiceResult(await ctx.services.admin.updateCategory(id, input));
      return { ...value, createdAt: iso(value.createdAt) };
    },
  },
  createAdminStore: {
    type: new GraphQLNonNull(StoreType),
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      address: { type: new GraphQLNonNull(GraphQLString) },
      lat: { type: new GraphQLNonNull(GraphQLFloat) },
      lng: { type: new GraphQLNonNull(GraphQLFloat) },
      serviceRadiusM: { type: GraphQLInt },
      isActive: { type: GraphQLBoolean },
    },
    resolve: async (_src: unknown, args: object, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      return serializeStore(fromServiceResult(await ctx.services.admin.createStore(args)));
    },
  },
  updateAdminStore: {
    type: new GraphQLNonNull(StoreType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      address: { type: GraphQLString },
      lat: { type: GraphQLFloat },
      lng: { type: GraphQLFloat },
      serviceRadiusM: { type: GraphQLInt },
      isActive: { type: GraphQLBoolean },
    },
    resolve: async (_src: unknown, args: { id: string }, ctx: GraphQLContext) => {
      requireAdmin(ctx);
      const { id, ...input } = args;
      return serializeStore(fromServiceResult(await ctx.services.admin.updateStore(id, input)));
    },
  },
  adjustAdminInventory: {
    type: new GraphQLNonNull(InventoryType),
    args: {
      inventoryId: { type: new GraphQLNonNull(GraphQLString) },
      delta: { type: new GraphQLNonNull(GraphQLInt) },
      reason: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_src: unknown, args: object, ctx: GraphQLContext) => {
      const admin = requireAdmin(ctx);
      const value = fromServiceResult(await ctx.services.admin.adjustInventory(admin.id, args));
      return {
        ...value,
        updatedAt: iso(value.updatedAt),
        product: serializeProduct(value.product),
      };
    },
  },
  transitionAdminOrder: {
    type: new GraphQLNonNull(OrderType),
    args: {
      orderId: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(OrderStatusType) },
      reason: { type: GraphQLString },
    },
    resolve: async (
      _src: unknown,
      args: { orderId: string; status: OrderStatus; reason?: string },
      ctx: GraphQLContext,
    ) => {
      const admin = requireAdmin(ctx);
      return serializeOrder(
        fromServiceResult(await ctx.services.admin.transitionOrder(admin.id, args)),
      );
    },
  },
};
