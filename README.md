# eslint-plugin-vue-root-class

[![CI](https://github.com/wiese/eslint-plugin-vue-root-class/workflows/Node.js%20CI/badge.svg)](https://github.com/wiese/eslint-plugin-vue-root-class)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-vue-root-class.svg)](https://www.npmjs.com/package/eslint-plugin-vue-root-class)

Enforce a – configurable – class on [Vue](https://vuejs.org/) component root nodes.

## Motivation

Consistently applying a class to components allows us to selectively administer styles and style resets/normalization (e.g. [1](https://meyerweb.com/eric/tools/css/reset/), [2](https://github.com/necolas/normalize.css)) to the matching elements and their children.

## Use

### Prerequisites

This assumes you are already using eslint in your project.

### Installation

* `npm install --save-dev eslint-plugin-vue-root-class`
* Mend the [eslint configuration](https://eslint.org/docs/user-guide/configuring#configuring-plugins) of your project (e.g. `.eslintrc.js`) to contain
```
{
    // ...
    plugins: [
        'vue-root-class'
    ],
    rules: {
        'vue-root-class/vue-root-class': [ 'error', { class: 'fancy' } ]
    }
}
```

🛈 Configuring the relevant class ("fancy" in the above example) is mandatory

## Known limitations

This only works…
 
* with classes added through a vanilla class attribute (e.g. `class="foo"`) or [bound](https://vuejs.org/v2/guide/class-and-style.html) through an array as a literal (e.g. `:class="[ 'foo' ]"`)  
💡 Eslint performs [static analysis](https://en.wikipedia.org/wiki/Static_program_analysis) of your component source code, it does not run it. As a consequence it can only detect [literal values](https://en.wikipedia.org/wiki/Literal_(computer_programming)), not values which would only be determined at [runtime](https://en.wikipedia.org/wiki/Runtime_(program_lifecycle_phase)).
* if the relevant class is an attribute to the first element inside the template (ignores possible vue-magic [v-if, ...])  
💡 Inside `eslint-plugin-vue` there [have](https://github.com/vuejs/eslint-plugin-vue/issues/884) [been](https://github.com/vuejs/eslint-plugin-vue/issues/986) [attempts](https://github.com/vuejs/eslint-plugin-vue/issues/971) to cater to a more liberal interpretation of a template ["root element"](https://vuejs.org/v2/guide/components.html#A-Single-Root-Element) but at this time there is no known need for the resulting complexity here.
