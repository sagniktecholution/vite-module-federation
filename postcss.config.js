import prefixer from 'postcss-prefix-selector';
import postcssUnlayer from './postcss-unlayer.js';

export default {
  plugins: [
    prefixer({
      prefix: '[data-exp-root]',
      transform(prefix, selector, prefixedSelector) {
        if (selector === ':root' || selector === 'html' || selector === 'body') {
          return prefix;
        }
        if (selector.startsWith('.mode\\:')) {
          return `${prefix}${selector}, ${prefix} ${selector}`;
        }
        return prefixedSelector;
      },
    }),
    postcssUnlayer(),
  ],
};
