// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    'playground',
    {
      type: 'category',
      label: 'Rules',
      items: [
        'rules/rule', //
        'rules/layer',
        'rules/simlayer',
        'rules/hyper-layer',
        'rules/duo-layer',
      ],
    },
    {
      type: 'category',
      label: 'Manipulators',
      items: [
        'manipulators/from',
        'manipulators/double-tap',
        'manipulators/to',
        'manipulators/condition',
        'manipulators/mouse_motion_to_scroll',
      ],
    },
    'utils',
  ],
}

module.exports = sidebars
