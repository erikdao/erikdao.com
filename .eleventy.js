const htmlmin = require('html-minifier');

module.exports = config => {
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy({
    'src/_includes/assets/css/global.css': './global.css'
  });

  // Minify html
  config.addTransform('htmlmin', (content, outputPath) => {
    if (process.env.ELEVENTY_PRODUCTION && outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified
    }
    return content
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  }
}
