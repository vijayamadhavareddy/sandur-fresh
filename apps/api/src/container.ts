import { createDb, type DbOrTx } from "@sf/db";
import { adminRepo } from "./modules/admin/admin.repo";
import { createAdminService } from "./modules/admin/admin.service";
import { createCartHandlers } from "./modules/cart/cart.handlers";
import { cartRepo } from "./modules/cart/cart.repo";
import { createCartService } from "./modules/cart/cart.service";
import { createDeliveryHandlers } from "./modules/delivery/delivery.handlers";
import { deliveryRepo } from "./modules/delivery/delivery.repo";
import { createDeliveryService } from "./modules/delivery/delivery.service";
import { createEventsRouter } from "./modules/notifications/events.router";
import { notificationsRepo } from "./modules/notifications/notifications.repo";
import { createNotificationsRouter } from "./modules/notifications/notifications.router";
import { createNotificationsService } from "./modules/notifications/notifications.service";
import { createOrdersHandlers } from "./modules/orders/orders.handlers";
import { ordersRepo } from "./modules/orders/orders.repo";
import { createOrdersService } from "./modules/orders/orders.service";
import { createOtpProvider, type OtpProvider } from "./modules/otp";
import { createProductsHandlers } from "./modules/products/products.handlers";
import { productsRepo } from "./modules/products/products.repo";
import { createProductsService } from "./modules/products/products.service";
import { createUsersHandlers } from "./modules/users/users.handlers";
import { usersRepo } from "./modules/users/users.repo";
import { createUsersService } from "./modules/users/users.service";
import { sendPush } from "./shared/push";
import type { CloudflareBindings } from "./types/hono";

const isOtpProviderName = (value: string | undefined): value is "2factor" | "dev" | "mock" =>
  value === "2factor" || value === "dev" || value === "mock";

const getOtpProvider = (env: CloudflareBindings): OtpProvider =>
  createOtpProvider({
    provider: isOtpProviderName(env?.OTP_PROVIDER) ? env.OTP_PROVIDER : undefined,
    apiKey: env?.OTP_API_KEY ?? env?.TWO_FACTOR_API_KEY,
    template: env?.OTP_TEMPLATE,
  });

export const createContainer = (targetDb: DbOrTx = createDb(), env: CloudflareBindings) => {
  const otpProvider = getOtpProvider(env);
  const notificationsService = createNotificationsService({
    db: targetDb,
    notificationsRepo,
    sendPush,
  });
  const usersService = createUsersService({
    db: targetDb,
    usersRepo,
    otpProvider,
  });
  const productsService = createProductsService({ db: targetDb, productsRepo });
  const cartService = createCartService({
    db: targetDb,
    cartRepo,
    productsRepo,
  });
  const ordersService = createOrdersService({
    db: targetDb,
    ordersRepo,
    cartRepo,
    productsRepo,
    usersRepo,
    notifications: notificationsService,
  });
  const deliveryService = createDeliveryService({
    db: targetDb,
    deliveryRepo,
    productsRepo,
    usersRepo,
  });
  const adminService = createAdminService({
    db: targetDb,
    adminRepo,
    ordersService,
  });

  const notificationsRouter = createNotificationsRouter(notificationsService);
  const eventsRouter = createEventsRouter();
  const usersHandlers = createUsersHandlers(usersService);
  const productsHandlers = createProductsHandlers(productsService);
  const cartHandlers = createCartHandlers(cartService);
  const ordersHandlers = createOrdersHandlers(ordersService);
  const deliveryHandlers = createDeliveryHandlers(deliveryService);

  const services = {
    users: usersService,
    products: productsService,
    cart: cartService,
    orders: ordersService,
    delivery: deliveryService,
    admin: adminService,
    notifications: notificationsService,
  };

  return {
    services,
    usersService,
    productsService,
    cartService,
    ordersService,
    deliveryService,
    adminService,
    notificationsService,
    usersHandlers,
    productsHandlers,
    cartHandlers,
    ordersHandlers,
    deliveryHandlers,
    notificationsRouter,
    eventsRouter,
  };
};

export type Container = ReturnType<typeof createContainer>;
export type Services = Container["services"];
