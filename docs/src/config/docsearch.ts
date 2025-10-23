import type { DocSearchClientOptions } from 'starlight-docsearch-typesense';

export default {
  typesenseCollectionName: 'starlight_docsearch_typesense_docs',
  typesenseServerConfig: {
    nodes: [
      import.meta.env.PUBLIC_TYPESENSE_URLS
        ? import.meta.env.PUBLIC_TYPESENSE_URLS.split(',').map(
            (url: string) => ({
              url,
            })
          )
        : {
            url: 'http://localhost:8108',
          },
    ],
    nearestNode: import.meta.env.PUBLIC_TYPESENSE_NEAREST_NODE_URL || undefined,
    apiKey: import.meta.env.PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY || 'xyz',
  },
  getMissingResultsUrl({ query }) {
    return `https://github.com/typesense/typesense-docsearch.js/issues/new?title=${query}`;
  },
} satisfies DocSearchClientOptions;
