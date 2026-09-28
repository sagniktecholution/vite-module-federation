// postcss-unlayer.js
const postcssUnlayer = () => {
  return {
    postcssPlugin: 'postcss-unlayer',
    Once(root) {
      root.walkAtRules('layer', (atRule) => {
        if (atRule.nodes) {
          atRule.replaceWith(atRule.nodes);
        } else {
          atRule.remove();
        }
      });
    },
  };
};
postcssUnlayer.postcss = true;

export default postcssUnlayer;
