// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer')
const lightCodeTheme = themes.github
const darkCodeTheme = themes.dracula

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'karabiner.ts',

  url: 'https://karabiner.ts.evanliu.dev',
  baseUrl: '/',

  organizationName: 'evan-liu',
  projectName: 'karabiner.ts',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsed: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'karabiner.ts',
        items: [
          { label: 'Docs', type: 'doc', docId: 'intro' },
          { label: 'Editor', to: 'editor' },
          {
            type: 'html',
            value: `<a href="https://github.com/evan-liu/karabiner.ts" style="display: flex">
              <img src="https://img.shields.io/github/stars/evan-liu/karabiner.ts" alt="GitHub Stars">
            </a>`,
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            label: 'karabiner.ts',
            href: 'https://github.com/evan-liu/karabiner.ts',
          },
          { label: 'By Evan Liu', href: 'https://evanliu.dev' },
          {
            label: 'Docs built with Docusaurus',
            href: 'https://docusaurus.io/',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['json'],
      },
      algolia: {
        appId: '8FCBVUX23W',
        apiKey: '577f1af3c7191bb53e86200751990c4e',
        indexName: 'karabiner-ts',
        contextualSearch: false,
      },
    }),

  future: {
    experimental_faster: true,
  },
}

module.exports = config
