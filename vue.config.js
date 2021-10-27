module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          type: 'javascript/auto',
          test: /\.mjs$/,
          use: [],
        },
      ],
    },
  },
}
