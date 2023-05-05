// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Rules',
      items: [
        'rules/rule', //
        'rules/layer',
        'rules/simlayer',
      ],
    },
    {
      type: 'category',
      label: 'Manipulators',
      items: [
        //
        'manipulators/from',
      ],
    },
  ],
}

module.exports = sidebars
