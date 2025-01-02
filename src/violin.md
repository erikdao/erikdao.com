---
title: 'Violin Playing'
layout: 'layouts/feed.html'
summary: "I started learning to play the violin since Aug 2023. It's been an exciting and joyful experience for me ever since. I share my journey to discover the art of violin playing here."
socialImage: '/images/books/2023_books_fb_og.jpeg'
useBookFonts: true
pagination:
  data: collections.violinPosts
  size: 10
permalink: 'violin{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: '#post-list'
---
