// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'vue/attribute-hyphenation': 'off',
    'no-console': 'off',
  },
})
