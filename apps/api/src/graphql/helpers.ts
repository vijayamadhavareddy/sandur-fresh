import { GraphQLError } from "graphql";
import type { z } from "zod";
import type { DomainError } from "../shared/errors";
import { toGraphQLError } from "../shared/errors";
import type { Result } from "../shared/result";
import type { GraphQLContext } from "./context";

export const fromServiceResult = <T>(result: Result<T, DomainError>): T => {
  if (!result.ok) throw toGraphQLError(result.error);
  return result.value;
};

export const requireUser = (ctx: GraphQLContext) => {
  if (!ctx.user) {
    throw toGraphQLError({ code: "UNAUTHORIZED", message: "Authentication required" });
  }
  return ctx.user;
};

export const parseInput = <T>(schema: z.ZodType<T>, input: unknown): T => {
  const parsed = schema.safeParse(input);
  console.log("parseInput", input);
  console.log("parseInput - result", parsed.success, parsed.data, parsed.error);
  if (!parsed.success) {
    throw new GraphQLError("Validation failed", {
      extensions: {
        code: "VALIDATION",
        details: parsed.error.issues,
      },
    });
  }
  return parsed.data;
};
