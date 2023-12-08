module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@types': './src/types',
            '@assets': './src/assets',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@locales': './src/locales',
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@services': './src/services',
            '@utils': './src/utils',
            '@mocks': './src/mocks',
          },
        },
      ],
    ],
  };
};
