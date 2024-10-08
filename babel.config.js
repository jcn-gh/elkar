module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          'react-compiler': {
            // Passed directly to the React Compiler Babel plugin.
            compilationMode: 'strict',
            panicThreshold: 'all_errors',
            sources: filename => {
              // Match file names to include in the React Compiler.
              return filename.includes('src/path/to/dir');
            },
          },
          web: {
            'react-compiler': {
              // Web-only settings...
            }
          }
        },
      ],
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};
