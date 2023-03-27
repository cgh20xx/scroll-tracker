import terser from '@rollup/plugin-terser';

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
      plugins: [terser()], // compress js
    },
  ],
};

export default config;
