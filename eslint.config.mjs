// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
    {
        rules: {
            'indent': ['error', 4],
            '@stylistic/indent': ['error', 4],
            'vue/script-indent': ['error', 4, { baseIndent: 1, switchCase: 1 }],
            'vue/singleline-html-element-content-newline': 'off',
            'vue/multiline-html-element-content-newline': 'off',
            'vue/html-indent': ['error', 4]
        }
    },
    {
        files: ['**/*.vue'],
        rules: {
            'indent': 'off',
            '@stylistic/indent': 'off'
        }
    }
])
// Your custom configs here
