// Generated by CoffeeScript 1.10.0
(function() {
  "use strict";
  var resetBlog;

  resetBlog = function() {
    var ArticleBox, Articles, ContentBox, Header, NavBox, closeNav, delayedActions, everySecond, fadeContent, fillNav, getTextFile, go, hideHeader, loadAndGo, loadArticle, onScroll, openNav, replaceArticle, showHeader, unfadeContent;
    Articles = null;
    replaceArticle = function(article, text) {
      var title;
      title = "";
      ArticleBox.innerHTML = text;
      window.location.hash = article.hash;
      if (typeof article.title === 'string') {
        title = article.title;
      }
      return document.getElementById('current-title').innerHTML = title;
    };
    getTextFile = function(url, success) {
      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          return success(xhttp.responseText);
        }
      };
      xhttp.open("GET", url, true);
      return xhttp.send();
    };
    loadArticle = function(article) {
      return getTextFile(article.url, function(t) {
        return replaceArticle(article, t);
      });
    };
    fillNav = function() {
      var el, i, len, list, v;
      list = document.createElement('ul');
      for (i = 0, len = Articles.length; i < len; i++) {
        v = Articles[i];
        el = document.createElement('li');
        el.innerHTML = v.title;
        el.onclick = function() {
          return go(v);
        };
        window.location.hash = v.hash;
        list.appendChild(el);
      }
      return NavBox.appendChild(list);
    };
    loadAndGo = function(jsonFN) {
      return getTextFile(jsonFN, function(t) {
        Articles = JSON.parse(t);
        fillNav();
        return go(Articles[0]);
      });
    };
    go = function(article) {
      loadArticle(article);
      return ContentBox.scrollTop = 0;
    };
    hideHeader = function() {
      return Header.classList.add('shields-up');
    };
    showHeader = function() {
      return Header.classList.remove('shields-up');
    };
    fadeContent = function() {
      return ContentBox.className = "faded";
    };
    unfadeContent = function() {
      return ContentBox.className = "unfaded";
    };
    closeNav = function() {
      return NavBox.className = "closed";
    };
    openNav = function() {
      return NavBox.className = "open";
    };
    everySecond = function() {
      if (ContentBox.scrollTop < 5) {
        showHeader();
        return ContentBox.addEventListener('scroll', onScroll, false);
      } else {
        return setTimeout(everySecond, 1000);
      }
    };
    onScroll = function() {
      if (ContentBox.scrollTop > 10) {
        hideHeader();
        ContentBox.removeEventListener('scroll', onScroll, false);
        return everySecond();
      }
    };
    NavBox = document.getElementsByTagName('nav')[0];
    ContentBox = document.getElementById('content');
    ArticleBox = document.getElementById('current');
    Header = document.querySelector('header');
    loadAndGo('json/blog-entries.json', NavBox);
    delayedActions = function() {
      unfadeContent();
      return closeNav();
    };
    setTimeout(delayedActions, 400);
    return ContentBox.onscroll = onScroll;
  };

  document.addEventListener("DOMContentLoaded", resetBlog);

}).call(this);
