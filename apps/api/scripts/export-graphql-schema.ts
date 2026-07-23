import { printSchema } from "graphql";
import { graphqlSchema } from "../src/graphql/schema";

await Bun.write(new URL("../schema.graphql", import.meta.url), `${printSchema(graphqlSchema)}\n`);
