module.exports = {
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['blockless-after-blockless', 'after-comment']
      }
    ]
  }
}
