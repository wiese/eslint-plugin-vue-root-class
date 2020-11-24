# eslint-plugin-vue-root-class

Enforce a - configurable - class on vue component root nodes.

## Motivation

Consistently applying a class to components allows us to apply styles and style resets to the matching elements.

## Use

### Prerequisites

This assumes you are already using eslint in your project.

### Installation

* `npm install --save-dev eslint-plugin-vue-root-class`

* Mend the eslint configuration of your project (e.g. .eslintrc.js)  
```js
{
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

This currently only works…
 
* with classes added through a vanilla class attribute (`class="foo"`) or [bound](https://vuejs.org/v2/guide/class-and-style.html) through an array as a literal (`:class="[ 'foo' ]"`)
* if the relevant class is an attribute to the first element inside of the template (ignores possible vue-magic [v-if, ...])