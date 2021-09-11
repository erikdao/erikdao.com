---
title: 'Software Engineering'
layout: 'layouts/feed.html'
summary: "Collection of posts on various topics including web development, functional programming, tooling, and so on."
pagination:
  data: collections.swePosts
  size: 10
permalink: 'software-engineering{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: '#post-list'
---
