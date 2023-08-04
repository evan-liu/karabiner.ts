/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  bracketSameLine: true,

  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrderTypeScriptVersion: '5.0.0',
  importOrder: ['<THIRD_PARTY_MODULES>', '', '^../', '', '^./'],
}
