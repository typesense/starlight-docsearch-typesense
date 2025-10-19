import type { StarlightPlugin } from '@astrojs/starlight/types';
import type { AstroUserConfig, ViteUserConfig } from 'astro';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'astro/zod';
import type docsearch from 'typesense-docsearch.js';

export default function starlightDocSearchTypesense(
  userConfig: DocSearchUserConfig
): StarlightPlugin {
  const opts = DocSearchConfigSchema.parse(userConfig);
  return {
    name: 'starlight-docsearch-typesense',
    hooks: {
      'config:setup'({ addIntegration, config, logger, updateConfig }) {
        // If the user has already has a custom override for the Search component, don't override it.
        if (config.components?.Search) {
          logger.warn(
            'It looks like you already have a `Search` component override in your Starlight configuration.'
          );
          logger.warn(
            'To render `starlight-docsearch-typesense`, remove the override for the `Search` component.\n'
          );
        } else {
          // Otherwise, add the Search component override to the user's configuration.
          updateConfig({
            pagefind: false,
            components: {
              ...config.components,
              Search: 'starlight-docsearch-typesense/Search.astro',
            },
          });
        }

        // Add an Astro integration that injects a Vite plugin to expose
        // the DocSearch config via a virtual module.
        addIntegration({
          name: 'starlight-docsearch',
          hooks: {
            'astro:config:setup': ({ config, updateConfig }) => {
              updateConfig({
                vite: {
                  plugins: [vitePluginDocSearch(config.root, opts)],
                },
              } satisfies AstroUserConfig);
            },
          },
        });
      },
    },
  };
}

export type DocSearchClientOptions = Omit<
  Parameters<typeof docsearch>[0],
  'container' | 'translations'
>;

type SearchOptions = DocSearchClientOptions['typesenseSearchParameters'];
const nodeSchema = z
  .object({
    host: z.string(),
    port: z.number(),
    protocol: z.enum(['http', 'https']),
    path: z.string().optional(),
  })
  .or(z.object({ url: z.string() }));

/** DocSearch configuration options. */
const DocSearchConfigSchema = z
  .object({
    /** The name of the Typesense collection to search. If using typesense-docsearch-scraper, this must match the `index_name` in the docsearch scraper config file. */
    typesenseCollectionName: z.string(),
    /** Configuration for connecting to a Typesense server or cluster. */
    typesenseServerConfig: z.object({
      apiKey: z.string(),
      nodes: z.array(nodeSchema),
      randomizeNodes: z.boolean().optional(),
      nearestNode: nodeSchema.optional(),
      connectionTimeoutSeconds: z.number().optional(),
      healthcheckIntervalSeconds: z.number().optional(),
      numRetries: z.number().optional(),
      retryIntervalSeconds: z.number().optional(),
      sendApiKeyAsQueryParam: z.boolean().optional(),
      useServerSideSearchCache: z.boolean().optional(),
      cacheSearchResultsForSeconds: z.number().optional(),
      additionalHeaders: z.record(z.string()).optional(),
      logLevel: z
        .enum(['error', 'warn', 'info', 'debug', 'trace', 'silent'])
        .optional(),
    }),
    /** Optional Typesense search parameters to pass to the Typesense DocSearch client. */
    typesenseSearchParameters: z.custom<SearchOptions>().optional(),

    // Optional DocSearch component config (only the serializable properties can be included here)
    /**
     * Disable saving recent searches and favorites to the local storage.
     * @default false
     */
    disableUserPersonalization: z.boolean().optional(),
    /** An optional initial query to populate the search box with on first render. */
    initialQuery: z.string().optional(),
  })
  .strict()
  .or(
    z
      .object({
        /**
         * The path to a JavaScript or TypeScript file containing a default export of options to
         * pass to the DocSearch client.
         *
         * The value can be a path to a local JS/TS file relative to the root of your project,
         * e.g. `'/src/docsearch.js'`, or an npm module specifier for a package you installed,
         * e.g. `'@company/docsearch-config'`.
         *
         * Use `clientOptionsModule` when you need to configure options that are not serializable,
         * such as `transformSearchClient()` or `resultsFooterComponent()`.
         *
         * When `clientOptionsModule` is set, all options must be set via the module file. Other
         * inline options passed to the plugin in `astro.config.mjs` will be ignored.
         *
         * @see https://docsearch.algolia.com/docs/api
         *
         * @example
         * // astro.config.mjs
         * // ...
         * starlightDocSearchTypesense({ clientOptionsModule: './src/config/docsearch.ts' }),
         * // ...
         *
         * // src/config/docsearch.ts
         * import type { DocSearchClientOptions } from 'starlight-docsearch-typesense';
         *
         * export default {
         *   appId: '...',
         *   apiKey: '...',
         *   indexName: '...',
         *   getMissingResultsUrl({ query }) {
         *     return `https://github.com/typesense/typesense-docsearch.js/issues/new?title=${query}`;
         *   },
         * } satisfies DocSearchClientOptions;
         */
        clientOptionsModule: z.string(),
      })
      .strict()
  );

type DocSearchUserConfig = z.infer<typeof DocSearchConfigSchema>;

/** Vite plugin that exposes the DocSearch config via virtual modules. */
function vitePluginDocSearch(
  root: URL,
  config: DocSearchUserConfig
): VitePlugin {
  const moduleId = 'virtual:starlight/docsearch-config';
  const resolvedModuleId = `\0${moduleId}`;

  const resolveId = (id: string, base = root) =>
    JSON.stringify(id.startsWith('.') ? resolve(fileURLToPath(base), id) : id);

  const moduleContent = `
	${
    'clientOptionsModule' in config
      ? `export { default } from ${resolveId(config.clientOptionsModule)};`
      : `export default ${JSON.stringify(config)};`
  }
	`;

  return {
    name: 'vite-plugin-starlight-docsearch-config',
    load(id) {
      return id === resolvedModuleId ? moduleContent : undefined;
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined;
    },
  };
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number];
