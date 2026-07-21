import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { addressBodySchema, updateProfileBodySchema } from "../../modules/users/users.schemas";
import type { GraphQLContext } from "../context";
import { fromServiceResult, parseInput, requireUser } from "../helpers";

const UserType = new GraphQLObjectType({
  name: "AppUser",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    role: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const AddressType = new GraphQLObjectType({
  name: "AppAddress",
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
    isDefault: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

export const userMutations = {
  updateProfile: {
    type: new GraphQLNonNull(UserType),
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    resolve: async (
      _src: unknown,
      args: { name?: string | null; email?: string | null },
      ctx: GraphQLContext,
    ) => {
      const user = requireUser(ctx);
      const input = parseInput(updateProfileBodySchema, {
        name: args.name ?? undefined,
        email: args.email === undefined ? undefined : args.email,
      });
      return fromServiceResult(await ctx.services.users.updateProfile(user.id, input));
    },
  },
  addAddress: {
    type: new GraphQLNonNull(AddressType),
    args: {
      label: { type: new GraphQLNonNull(GraphQLString) },
      line1: { type: new GraphQLNonNull(GraphQLString) },
      line2: { type: GraphQLString },
      city: { type: new GraphQLNonNull(GraphQLString) },
      pincode: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
      lat: { type: new GraphQLNonNull(GraphQLFloat) },
      lng: { type: new GraphQLNonNull(GraphQLFloat) },
      isDefault: { type: GraphQLBoolean },
    },
    resolve: async (_src: unknown, args: Record<string, unknown>, ctx: GraphQLContext) => {
      const user = requireUser(ctx);
      const input = parseInput(addressBodySchema, args);
      return fromServiceResult(await ctx.services.users.addAddress(user.id, input));
    },
  },
};
