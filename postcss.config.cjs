module.exports = {
  plugins: {
    '@mekari/pixel3-postcss': {
      include: ['./src/**/*.{ts,tsx,vue}', '../../packages/**/src/**/*.{ts,tsx,vue}'],
      exclude: ['../../packages/**/node_modules', '../../packages/**/dist'],
      replaceConfig: ['include']
    }
  }
}
