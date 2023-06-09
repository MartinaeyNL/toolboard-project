module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../components/**/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../components/**/stories.@(js|jsx|ts|tsx)",
    "../../../features/**/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../../features/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../features/**/stories.@(js|jsx|ts|tsx)",
    "../../../pages/**/stories/*.stories.@(js|jsx|ts|tsx)",
    "../../../pages/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../pages/**/stories.@(js|jsx|ts|tsx)",
  ],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-mdx-gfm"],
  "staticDirs": ['../../../../resources'],
  "framework": {
    name: "@storybook/web-components-vite",
    options: {}
  },
  "features": {
    "storyStoreV7": true
  },
  docs: {
    autodocs: true
  },
  core: {
    disableTelemetry: true
  }
};