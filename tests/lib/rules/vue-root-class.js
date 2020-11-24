'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/vue-root-class')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

const TEST_CLASS = 'rootclass'

tester.run('vue-root-class', rule, {
  valid: [
    {
      filename: 'Foo.vue',
      code: '<template><div class="' + TEST_CLASS + '">abc</div></template>',
      options: [{ class: TEST_CLASS }]
    },
    {
      filename: 'Foo.vue',
      code: '<template><div class="my-Foo ' + TEST_CLASS + '">Foo</div></template>',
      options: [{ class: TEST_CLASS }]
    },
    {
      filename: 'Foo.vue',
      code: '<template>\n    <!-- comment -->\n    <div :class="[ \'' + TEST_CLASS + '\', \'lorem\' ]">abc</div>\n</template>',
      options: [{ class: TEST_CLASS }]
    }
  ],
  invalid: [
    {
      filename: 'FooBar.vue',
      code: '<template>\n</template>',
      errors: [
        'Components must have a root node which bears the "' + TEST_CLASS + '" class.'
      ],
      options: [{ class: TEST_CLASS }]
    },
    {
      filename: 'FooBar.vue',
      code: '<template><div>nope</div></template>',
      errors: [
        'Components must bear the "' + TEST_CLASS + '" class in their root node.'
      ],
      options: [{ class: TEST_CLASS }]
    },
    {
      filename: 'FooBar.vue',
      code: '<template><div v-if="true">one</div><div v-else class="' + TEST_CLASS + '">two</div></template>',
      errors: [
        // The rule only supports checking the first element for the class
        'Components must bear the "' + TEST_CLASS + '" class in their root node.'
      ],
      options: [{ class: TEST_CLASS }]
    },
    {
      filename: 'FooBar.vue',
      code: '<template><div :class="{ ' + TEST_CLASS + ': true }">nope</div></template>',
      errors: [
        // Adding the root class through an ObjectExpressions is not supported.
        'Components must bear the "' + TEST_CLASS + '" class in their root node.'
      ],
      options: [{ class: TEST_CLASS }]
    }
  ]
})
