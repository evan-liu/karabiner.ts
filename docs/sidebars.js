// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Rules',
      collapsed: false,
      items: [
        'rules/rule', //
        'rules/layer',
        'rules/simlayer',
      ],
    },
  ],
}

module.exports = sidebars
