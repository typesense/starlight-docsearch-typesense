import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightTypesense from 'starlight-typesense'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/haydenhoang/starlight-typesense/edit/main/docs/',
      },
      plugins: [starlightTypesense()],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started'],
        },
      ],
      social: [
        { href: 'https://github.com/haydenhoang/starlight-typesense', icon: 'github', label: 'GitHub' },
      ],
      title: 'starlight-typesense',
    }),
  ],
})
