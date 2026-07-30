import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { ClientError, GraphQLClient, type RequestOptions, type Variables } from "graphql-request";

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL ?? "/graphql", {
  credentials: "include",
});
export const apiBase = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
export const AUTH_EXPIRED_EVENT = "sandur-admin-auth-expired";

export async function request<TResult, TVariables extends Variables = Variables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
) {
  console.log("test", apiBase);
  const options = {
    document,
    variables: variables ?? ({} as TVariables),
  } as unknown as RequestOptions<TVariables, TResult>;
  try {
    return await client.request<TResult, TVariables>(options);
  } catch (error) {
    if (
      error instanceof ClientError &&
      error.response.errors?.some((item) => item.extensions?.code === "UNAUTHORIZED")
    ) {
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    throw error;
  }
}

export async function uploadProductImage(image: File) {
  const body = new FormData();
  body.append("image", image);
  const response = await fetch(`${apiBase}/api/v1/admin/uploads/product-image`, {
    method: "POST",
    credentials: "include",
    body,
  });
  if (!response.ok) throw new Error("Image upload failed");
  const result: unknown = await response.json();
  if (!isUploadResult(result)) throw new Error("Invalid upload response");
  return apiBase && result.data.url.startsWith("/")
    ? `${apiBase}${result.data.url}`
    : result.data.url;
}

function isUploadResult(value: unknown): value is { data: { url: string } } {
  if (!value || typeof value !== "object" || !("data" in value)) return false;
  const data = value.data;
  return Boolean(data && typeof data === "object" && "url" in data && typeof data.url === "string");
}
