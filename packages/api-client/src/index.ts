/**
 * @repo/api-client
 *
 * Type-safe API client generated from server/src/swagger.yaml.
 *
 * USAGE:
 *   import { apiClient, authenticatedClient } from "@repo/api-client";
 *
 *   // Public endpoint
 *   const { data, error } = await apiClient.GET("/menu");
 *
 *   // Authenticated endpoint
 *   const client = authenticatedClient("your-jwt-token");
 *   const { data } = await client.GET("/reservations");
 *
 * ADDING NEW ENDPOINTS:
 *   1. Add the endpoint to server/src/swagger.yaml
 *   2. Run: npm run generate -w @repo/api-client
 *   3. Implement the route in the server
 *   4. The new endpoint is immediately typed here
 */

import createClient from "openapi-fetch";
import type { paths } from "./schema.d.ts";

const BASE_URL =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) ||
  "http://localhost:4000/api";

/** Pre-configured client for public (unauthenticated) endpoints. */
export const apiClient = createClient<paths>({ baseUrl: BASE_URL });

/**
 * Returns a client pre-configured with a Bearer token for authenticated endpoints.
 *
 * @example
 * const client = authenticatedClient(token);
 * const { data } = await client.GET("/reservations");
 */
export function authenticatedClient(token: string) {
  return createClient<paths>({
    baseUrl: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Re-export the generated types so consumers can use them without
// importing from the internal schema file directly.
export type { paths } from "./schema.d.ts";
export type {
  components,
} from "./schema.d.ts";
