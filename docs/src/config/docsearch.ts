import type { DocSearchClientOptions } from 'starlight-docsearch-typesense';

export default {
  typesenseCollectionName: 'starlight_typesense_docs',
  typesenseServerConfig: {
    nodes: [{ url: 'http://localhost:8108' }],
    apiKey: 'xyz',
  },
  getMissingResultsUrl({ query }) {
    return `https://github.com/typesense/typesense-docsearch.js/issues/new?title=${query}`;
  },
} satisfies DocSearchClientOptions;
