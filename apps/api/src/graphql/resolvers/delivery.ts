import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  serviceabilityQuerySchema,
  slotsQuerySchema,
} from "../../modules/delivery/delivery.schemas";
import type { GraphQLContext } from "../context";
import { fromServiceResult, parseInput, requireUser } from "../helpers";

const ServiceabilityType = new GraphQLObjectType({
  name: "AppServiceability",
  fields: {
    serviceable: { type: new GraphQLNonNull(GraphQLBoolean) },
    storeId: { type: GraphQLString },
    storeName: { type: GraphQLString },
    distanceM: { type: GraphQLInt },
    etaMinutes: { type: GraphQLInt },
  },
});

const SlotType = new GraphQLObjectType({
  name: "AppDeliverySlot",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    startAt: { type: new GraphQLNonNull(GraphQLString) },
    endAt: { type: new GraphQLNonNull(GraphQLString) },
    capacity: { type: new GraphQLNonNull(GraphQLInt) },
    remaining: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const SlotsResultType = new GraphQLObjectType({
  name: "AppDeliverySlots",
  fields: {
    storeId: { type: new GraphQLNonNull(GraphQLString) },
    slots: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SlotType))) },
  },
});

export const deliveryQueries = {
  checkServiceability: {
    type: new GraphQLNonNull(ServiceabilityType),
    args: {
      lat: { type: GraphQLFloat },
      lng: { type: GraphQLFloat },
      addressId: { type: GraphQLString },
    },
    resolve: async (
      _src: unknown,
      args: { lat?: number; lng?: number; addressId?: string },
      ctx: GraphQLContext,
    ) => {
      const query = parseInput(serviceabilityQuerySchema, args);
      return fromServiceResult(
        await ctx.services.delivery.checkServiceability(query, ctx.user?.id),
      );
    },
  },
  availableDeliverySlots: {
    type: new GraphQLNonNull(SlotsResultType),
    args: {
      addressId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_src: unknown, args: { addressId: string }, ctx: GraphQLContext) => {
      const user = requireUser(ctx);
      const query = parseInput(slotsQuerySchema, args);
      return fromServiceResult(await ctx.services.delivery.availableSlots(query, user.id));
    },
  },
};
