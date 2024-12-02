module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo', // Preset recomendado por Expo
    ],
    plugins: [
      ['@babel/plugin-transform-class-properties', { loose: true }], // Transformación de propiedades de clase
      ['@babel/plugin-transform-private-methods', { loose: true }], // Métodos privados
      ['@babel/plugin-transform-private-property-in-object', { loose: true }], // Propiedades privadas en objetos
      'react-native-reanimated/plugin', // Siempre debe ir al final

    ],
  };
};
