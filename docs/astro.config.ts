import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightDocSearchTypesense from 'starlight-docsearch-typesense';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'http://192.168.1.178:4321',
  integrations: [
    starlight({
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
        {
          label: 'Resources',
          items: ['resources'],
        },
      ],
      social: [
        {
          href: 'https://github.com/typesense/starlight-docsearch-typesense',
          icon: 'github',
          label: 'GitHub',
        },
      ],
      title: 'Starlight DocSearch Typesense',
    }),
    sitemap(),
  ],
});
