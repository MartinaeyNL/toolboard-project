export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#35363A',
      },
      {
        name: 'light',
        value: '#F9F9F9'
      }
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
}