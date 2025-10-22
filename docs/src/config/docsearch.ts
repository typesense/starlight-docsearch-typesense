import type { DocSearchClientOptions } from 'starlight-docsearch-typesense';

export default {
  typesenseCollectionName: 'starlight_docsearch_typesense_docs',
  typesenseServerConfig: {
    nodes: [
      {
        url: import.meta.env.PUBLIC_TYPESENSE_URL || 'http://localhost:8108',
      },
    ],
    apiKey: import.meta.env.PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY || 'xyz',
  },
  getMissingResultsUrl({ query }) {
    return `https://github.com/typesense/typesense-docsearch.js/issues/new?title=${query}`;
  },
} satisfies DocSearchClientOptions;
