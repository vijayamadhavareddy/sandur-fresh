import { db } from "./db/client";
import { createCartHandlers } from "./modules/cart/cart.handlers";
import { cartRepo } from "./modules/cart/cart.repo";
import { createCartService } from "./modules/cart/cart.service";
import { createDeliveryHandlers } from "./modules/delivery/delivery.handlers";
import { deliveryRepo } from "./modules/delivery/delivery.repo";
import { createDeliveryService } from "./modules/delivery/delivery.service";
import { createOrdersHandlers } from "./modules/orders/orders.handlers";
import { ordersRepo } from "./modules/orders/orders.repo";
import { createOrdersService } from "./modules/orders/orders.service";
import { createProductsHandlers } from "./modules/products/products.handlers";
import { productsRepo } from "./modules/products/products.repo";
import { createProductsService } from "./modules/products/products.service";
import { createUsersHandlers } from "./modules/users/users.handlers";
import { usersRepo } from "./modules/users/users.repo";
import { createUsersService } from "./modules/users/users.service";

export const usersService = createUsersService({ db, usersRepo });
export const productsService = createProductsService({ db, productsRepo });
export const cartService = createCartService({ db, cartRepo, productsRepo });
export const ordersService = createOrdersService({
  db,
  ordersRepo,
  cartRepo,
  productsRepo,
  usersRepo,
});
export const deliveryService = createDeliveryService({
  db,
  deliveryRepo,
  productsRepo,
  usersRepo,
});

export const usersHandlers = createUsersHandlers(usersService);
export const productsHandlers = createProductsHandlers(productsService);
export const cartHandlers = createCartHandlers(cartService);
export const ordersHandlers = createOrdersHandlers(ordersService);
export const deliveryHandlers = createDeliveryHandlers(deliveryService);

export const services = {
  users: usersService,
  products: productsService,
  cart: cartService,
  orders: ordersService,
  delivery: deliveryService,
};
