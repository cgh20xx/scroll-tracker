import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

const config = {
  input: {
    ScrollTracker: 'src/index.js',
  },
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].esm.js',
      format: 'es', // ES Mdoule
    },
    {
      name: 'ScrollTracker', // global name under window
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'iife', // for browser
    },
  ],
  plugins: [resolve()],
  // plugins: [resolve(), terser()],
  // external: [''],
};

export default config;
