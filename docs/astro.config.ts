import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightDocSearchTypesense from 'starlight-docsearch-typesense';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Starlight DocSearch Typesense',
      defaultLocale: 'root', // optional
      locales: {
        root: {
          label: 'English',
          lang: 'en', // lang is required for root locales
        },
        vi: {
          label: 'Tiếng Việt',
          lang: 'vi',
        },
      },
      editLink: {
        baseUrl:
          'https://github.com/typesense/starlight-docsearch-typesense/edit/main/docs/',
      },
      plugins: [
        starlightDocSearchTypesense({
          typesenseCollectionName: 'starlight_typesense_docs',
          typesenseServerConfig: {
            nodes: [{ url: 'http://localhost:8108' }],
            apiKey: 'xyz',
          },
        }),
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started', 'configuration'],
        },
        {
          label: 'Guides',
          items: ['guides/typesense-docsearch-scraper'],
        },
      ],
      social: [
        {
          href: 'https://github.com/typesense/starlight-docsearch-typesense',
          icon: 'github',
          label: 'GitHub',
        },
      ],
    }),
  ],
});
