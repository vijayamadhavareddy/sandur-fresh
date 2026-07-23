import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_SCHEMA ?? "../api/schema.graphql",
  documents: ["src/**/*.graphql"],
  generates: {
    "src/api/generated/": {
      preset: "client",
      config: { useTypeImports: true, enumsAsTypes: true },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
