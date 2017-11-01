import vue from 'vue';

vue.config.productionTip = false;

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec.ts$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
// const srcContext = require.context('../../src', true, /^\.\/(?!main(\.ts)?$)/);
// srcContext.keys().forEach(srcContext);
