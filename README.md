# Starlight DocSearch Typesense 🌟🔎⚡️

A Starlight plugin that integrates Typesense with the DocSearch interface to add lightning-fast, typo-tolerant search to your Starlight documentation site.

![Plugin demo](assets/screenshot.png 'Plugin demo')

## About Typesense & Starlight

[**Typesense**](https://typesense.org/) is an open-source, lightning-fast search engine that delivers instant, typo-tolerant results with minimal setup. It's an open source alternative to Algolia and an easier-to-use alternative to ElasticSearch.

[**Starlight**](https://starlight.astro.build/) is a documentation framework built on Astro, focused on performance, accessibility, and customization. It helps developers create elegant, content-rich documentation sites with ease.

Together, **Typesense**, **Starlight** and [**DocSearch**](https://github.com/typesense/typesense-docsearch.js) provide a seamless way to add powerful, blazingly-fast search to modern documentation websites.

## Indexing Your Documentation

To power the search experience, you'll need to index your site's content into Typesense.

The [`typesense-docsearch-scraper`](https://github.com/typesense/typesense-docsearch-scraper) is a crawler that scans your documentation pages, extracts structured content (like titles, headings, and paragraphs), and uploads it into your Typesense collection.

You can run the scraper manually or automate it (e.g. via GitHub Actions) so that your search index stays up-to-date as your docs evolve.

## Getting Started

Check out the [Getting Started Guide](https://starlight-docsearch.typesense.org/) to add Typesense search to your Starlight site quickly.

## License

Licensed under the MIT License, Copyright © Typesense.

See [LICENSE](/LICENSE) for more information.
