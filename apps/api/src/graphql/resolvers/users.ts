import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  addressBodySchema,
  requestOtpBodySchema,
  updateAddressBodySchema,
  updateProfileBodySchema,
  verifyOtpBodySchema,
} from "../../modules/users/users.schemas";
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

const RequestOtpPayloadType = new GraphQLObjectType({
  name: "AppRequestOtpPayload",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const AuthPayloadType = new GraphQLObjectType({
  name: "AppAuthPayload",
  fields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(UserType) },
  },
});

export const userQueries = {
  me: {
    type: new GraphQLNonNull(UserType),
    resolve: async (_src: unknown, _args: unknown, ctx: GraphQLContext) => {
      const user = requireUser(ctx);
      return fromServiceResult(await ctx.services.users.getProfile(user.id));
    },
  },
  myAddresses: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(AddressType))),
    resolve: async (_src: unknown, _args: unknown, ctx: GraphQLContext) => {
      const user = requireUser(ctx);
      return fromServiceResult(await ctx.services.users.listAddresses(user.id));
    },
  },
};

export const userMutations = {
  requestOtp: {
    type: new GraphQLNonNull(RequestOtpPayloadType),
    args: {
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_src: unknown, args: { phone: string }, ctx: GraphQLContext) => {
      const input = parseInput(requestOtpBodySchema, args);
      return fromServiceResult(await ctx.services.users.requestOtp(input));
    },
  },
  verifyOtp: {
    type: new GraphQLNonNull(AuthPayloadType),
    args: {
      phone: { type: new GraphQLNonNull(GraphQLString) },
      code: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_src: unknown, args: { phone: string; code: string }, ctx: GraphQLContext) => {
      const input = parseInput(verifyOtpBodySchema, args);
      return fromServiceResult(await ctx.services.users.verifyOtp(input));
    },
  },
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
  updateAddress: {
    type: new GraphQLNonNull(AddressType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      label: { type: GraphQLString },
      line1: { type: GraphQLString },
      line2: { type: GraphQLString },
      city: { type: GraphQLString },
      pincode: { type: GraphQLString },
      phone: { type: GraphQLString },
      lat: { type: GraphQLFloat },
      lng: { type: GraphQLFloat },
      isDefault: { type: GraphQLBoolean },
    },
    resolve: async (
      _src: unknown,
      args: { id: string } & Record<string, unknown>,
      ctx: GraphQLContext,
    ) => {
      const user = requireUser(ctx);
      const { id, ...rest } = args;
      const input = parseInput(updateAddressBodySchema, rest);
      return fromServiceResult(await ctx.services.users.updateAddress(user.id, id, input));
    },
  },
  deleteAddress: {
    type: new GraphQLNonNull(GraphQLBoolean),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_src: unknown, args: { id: string }, ctx: GraphQLContext) => {
      const user = requireUser(ctx);
      fromServiceResult(await ctx.services.users.removeAddress(user.id, args.id));
      return true;
    },
  },
};
