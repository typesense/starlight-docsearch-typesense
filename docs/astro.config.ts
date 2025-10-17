import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightTypesense from 'starlight-typesense';

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

        // Simplified Chinese docs in `src/content/docs/zh-cn/`
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
        // Arabic docs in `src/content/docs/ar/`
        ar: {
          label: 'العربية',
          dir: 'rtl',
        },
      },
      editLink: {
        baseUrl:
          'https://github.com/typesense/starlight-typesense/edit/main/docs/',
      },
      plugins: [
        starlightTypesense({
          typesenseCollectionName: 'starlight_typesense_docs',
          typesenseServerConfig: {
            nodes: [{ url: 'http://localhost:8108' }],
            apiKey: 'xyz',
            connectionTimeoutSeconds: 2,
          },
          // typesenseSearchParameters: {
          //   query_by: 'title,content',
          //   highlight_full_fields: 'title,content',
          //   snippet_threshold: 0,
          //   num_typos: 2,
          // },
        }),
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started'],
        },
        {
          label: 'API Reference',
          items: ['api-reference'],
        },
      ],
      social: [
        {
          href: 'https://github.com/typesense/starlight-typesense',
          icon: 'github',
          label: 'GitHub',
        },
      ],
      title: 'starlight-typesense',
    }),
    sitemap(),
  ],
});
