const htmlmin = require('html-minifier');
// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

module.exports = config => {
  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

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

  // Returns a collection of life posts in reverse order
  config.addCollection('lifePosts', collection => {
    return [...collection.getFilteredByGlob('./src/life/*.md')].reverse();
  });

  // Returns a collection of machine learning posts in reverse order
  config.addCollection('mlPosts', collection => {
    return [...collection.getFilteredByGlob('./src/machine-learning/*.md')].reverse();
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
