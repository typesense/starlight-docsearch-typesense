import type { DocSearchClientOptions } from 'starlight-docsearch-typesense';

export default {
  typesenseCollectionName: 'starlight_docsearch_typesense_docs',
  typesenseServerConfig: {
    nodes: [
      {
        host: import.meta.env.PUBLIC_TYPESENSE_HOST || 'localhost',
        port: import.meta.env.PUBLIC_TYPESENSE_PORT || 8108,
        protocol: import.meta.env.PUBLIC_TYPESENSE_PROTOCOL || 'http',
      },
    ],
    apiKey: import.meta.env.PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY || 'xyz',
  },
  getMissingResultsUrl({ query }) {
    return `https://github.com/typesense/typesense-docsearch.js/issues/new?title=${query}`;
  },
} satisfies DocSearchClientOptions;
