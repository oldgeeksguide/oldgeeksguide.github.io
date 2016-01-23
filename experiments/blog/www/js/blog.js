"use strict";

function resetBlog () {
/****
    //var CurrentArticle;  // element of Articles
    var ArticleBox;  // the article element
    var NavBox;   // the list of articles that you can load
    var ContentBox;     //
    var Header;
****/

    // INIT code, 'module' var decs
    var Articles;  // Parsed JSON object with list of blog entries
    var NavBox = document.getElementsByTagName('nav')[0]

    var ContentBox = document.getElementById('content');
    var Header = document.getElementsByTagName('header')[0]
    var ArticleBox = document.getElementById('current');
    var Header = document.querySelector('header');

    loadAndGo('json/blog-entries.json', NavBox);

    function delayedActions() {
        unfadeContent();
        closeNav();
    }
    setTimeout(delayedActions, 400);
    // window.addEventListener('scroll', onScroll, false);
    ContentBox.onscroll = onScroll;


    // private functions
    function replaceArticle(article, text) {
        var title;

        ArticleBox.innerHTML = text;
        window.location.hash = article.hash;  // don't forget hash starts with #

        if (typeof article.title !== 'string') {
            title = "";
        }
        document.getElementById('current-title').innerHTML = article.title;
    }

    function getTextFile(url, success) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                success(xhttp.responseText);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function loadArticle(article) {
        getTextFile(article.url, function (t) {
            replaceArticle(article, t);
        });
    }

    function loadAndGo(jsonFN) {
        getTextFile(jsonFN, function (t) {
            Articles = JSON.parse(t);
            fillNav();
            go(Articles[0]);
        });
    }

    function fillNav() {
        var list = document.createElement('ul');
        Articles.forEach(function(v) {
            var el = document.createElement('li');
            el.innerHTML = v.title;
            el.onclick = function () {go(v);};
            window.location.hash = v.hash;
            list.appendChild(el);
        });
        //NavBox.replaceChild(list, document.getElementById("nav-list"));
        NavBox.appendChild(list)
    }

    function go(article) {
        //loadArticle("blog-entries/"+article, g.current, title);
        loadArticle(article);
        
        // window.scroll(0,0);
        ContentBox.scrollTop = 0;
    }

    function hideHeader() {
        // could also hide by changing opacity
        Header.classList.add('shields-up');
    }

    function showHeader() {
        Header.classList.remove('shields-up');
    }

    function fadeContent() {
        ContentBox.className="faded";
    }

    function unfadeContent() {
        ContentBox.className="unfaded";
    }

    function closeNav() {
        NavBox.className="closed";
    }

    function openNav() {
        NavBox.className="open";
    }

    function everySecond() {
        if (ContentBox.scrollTop < 5) {
            showHeader();
            ContentBox.addEventListener('scroll', onScroll, false);
        } else {
            setTimeout(everySecond, 1000);
        }
    }

    function onScroll() {
        if (ContentBox.scrollTop > 10) {
            hideHeader();
            ContentBox.removeEventListener('scroll', onScroll, false);
            everySecond();
        }
    }
}


document.addEventListener("DOMContentLoaded", resetBlog);
//window.onload = resetBlog;
