// ==UserScript==
// @name         Say Yeah Bunny Link Generator
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Say Yeah bunny
// @author       Randy Rijkschroeff
// @updateURL    https://github.com/r2cool/sayyeah-bunny/raw/main/sayyeah.user.js
// @downloadURL  https://github.com/r2cool/sayyeah-bunny/raw/main/sayyeah.user.js
// @match        https://dash.bunny.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bunny.net
// @grant        GM_setClipboard
// @grant        window.onurlchange
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(`
        #but1 {
            margin-top: 10px;
            display: inline-block;
            vertical-align: top;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            border: none;
            -webkit-user-select: none;
            user-select: none;
            color: #fff;
            padding: 0 1.07145rem;
            border-radius: 6px;
            background: linear-gradient(171.02deg,#ffaf48 4.38%,#ff7854 111.49%);
            font-size: 1rem;
            font-weight: 600;
            box-shadow: 0 1px 2px #0c0c0c14;
            height: 40px;line-height: 40px;
        }
        #but1:hover {
            text-decoration: none;
            background: linear-gradient(53.28deg,#ffaf48 35.53%,#ff7854 79.13%);
        }
    `);
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    window.addEventListener('urlchange', (info) => {
        waitForElm('[label="Video ID"] input').then((elm) => {
            var copy_button = document.createElement('button');
            copy_button.innerText = "Kopieer link";
            copy_button.setAttribute('id','but1');
            if(document.getElementById('but1') == null){
                document.querySelectorAll('[label="Video ID"]')[0].append(copy_button);
            }
            copy_button.addEventListener("click", () => {
                GM_setClipboard('https://video.sayyeah.nl/' + document.querySelectorAll('[label="Video ID"] input')[0].value);
            });
        });
    });
    if (window.onurlchange === null) {
        window.addEventListener('urlchange', (info) => {
            waitForElm('[label="Video ID"] input').then((elm) => {
                var copy_button = document.createElement('button');
                copy_button.innerText = "Kopieer link";
                copy_button.setAttribute('id','but1');
                if(document.getElementById('but1') == null){
                    document.querySelectorAll('[label="Video ID"]')[0].append(copy_button);
                }
                copy_button.addEventListener("click", () => {
                    GM_setClipboard('https://video.sayyeah.nl/' + document.querySelectorAll('[label="Video ID"] input')[0].value);
                });
            });
        });
    }
})();
