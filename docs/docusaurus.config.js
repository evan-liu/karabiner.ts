// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer')
const lightCodeTheme = themes.github
const darkCodeTheme = themes.dracula

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'karabiner.ts',

  url: 'https://karabiner.ts.keymaps.app',
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
        pages: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '📝 Docs',
        items: [
          {
            href: 'https://github.com/evan-liu/karabiner.ts',
            label: 'karabiner.ts',
            position: 'left',
          },
          {
            href: 'https://stackblitz.com/github/evan-liu/karabiner.ts/tree/main/editor?embed=1&file=rules.js&hideExplorer=1&hideNavigation=1&terminalHeight=20&title=karabiner.ts%20editor',
            label: 'online editor',
            position: 'left',
          },
        ],
      },
      footer: {},
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
}

module.exports = config
