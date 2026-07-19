export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_CLIENT_SECRET;
  const apiVersion = process.env.SHOPIFY_API_VERSION;

  if (!domain || !storefrontAccessToken || !apiVersion) {
    throw new Error('Shopify credentials are not configured.');
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json = await response.json() as { data?: T; errors?: unknown[] };

  if (json.errors) {
    throw new Error('GraphQL Errors from Shopify');
  }

  if (!json.data) {
    throw new Error('No data returned from Shopify');
  }

  return json.data;
}
