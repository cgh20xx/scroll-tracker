import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: {
    ScrollTracker: 'src/index.js',
  },
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].esm.js',
      format: 'es', // ES Mdoule
      sourcemap: true,
    },
    {
      dir: 'dist',
      entryFileNames: '[name].esm.min.js',
      format: 'es', // ES Module
      plugins: [terser()],
    },
    {
      name: 'ScrollTracker', // global name under window
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'iife', // for browser]
      sourcemap: true,
    },
    {
      name: 'ScrollTracker', // global name under window
      dir: 'dist',
      entryFileNames: '[name].min.js',
      format: 'iife', // for browser]
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(), // 使 Rollup 能找到外部的 npm 模組
    commonjs(), // 使 Rollup 能將 CommonJS Module 轉換成 ES Module
  ],
  // external: ['lodash-es', 'eventemitter3'], // 外部模組不會被打包，需額外設定 output.globals
};

export default config;
