import { createDb } from "@sf/db";
import { printSchema } from "graphql";
import { getGraphqlSchema } from "../src/graphql/schema";

const db = createDb();
const schema = getGraphqlSchema(db);
await Bun.write(new URL("../schema.graphql", import.meta.url), `${printSchema(schema)}\n`);
