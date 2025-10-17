declare module 'virtual:starlight/docsearch-config' {
  const DocSearchClientOptions: import('./index').DocSearchClientOptions;
  export default DocSearchClientOptions;
}

declare module 'typesense-docsearch.js/dist/umd' {
  const docsearch: import('typesense-docsearch.js');
  export default docsearch;
}
