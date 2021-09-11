---
title: 'Life stories'
layout: 'layouts/feed.html'
pagination:
  data: collections.lifePosts
  size: 10
permalink: 'life{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: '#post-list'
summary: "Various things in my life. Posts mostly in Vietnamese, with some in English."
---
