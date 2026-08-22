import type { DbOrTx } from "@sf/db";
import { db } from "@sf/db";
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
import { type PushSender, sendPush } from "./shared/push";

export const createContainer = (
  targetDb: DbOrTx = db,
  options?: { sendPush?: PushSender; otpProvider?: OtpProvider },
) => {
  const push = options?.sendPush ?? sendPush;
  const otpProvider = options?.otpProvider ?? createOtpProvider();
  const notificationsService = createNotificationsService({
    db: targetDb,
    notificationsRepo,
    sendPush: push,
  });
  const usersService = createUsersService({ db: targetDb, usersRepo, otpProvider });
  const productsService = createProductsService({ db: targetDb, productsRepo });
  const cartService = createCartService({ db: targetDb, cartRepo, productsRepo });
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
  const adminService = createAdminService({ db: targetDb, adminRepo, ordersService });

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

export const defaultContainer = createContainer(db);

export const {
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
} = defaultContainer;
