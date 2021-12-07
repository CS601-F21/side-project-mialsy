const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
                "@primary-color": "#A74C65",
                "@layout-header-background": "#303956",
                "@popover-background": "#B48B9B",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};