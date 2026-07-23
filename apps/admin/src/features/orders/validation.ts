import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const transitionSchema = toTypedSchema(z.object({ reason: z.string().max(500).optional() }));
