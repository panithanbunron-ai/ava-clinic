// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        'indent': ['error', 4],
        '@stylistic/indent': ['error', 4],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/html-indent': ['error', 4]
    }
})
// Your custom configs here
