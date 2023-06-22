// ==UserScript==
// @name         Say Yeah Bunny Link Generator
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Say Yeah bunny
// @author       Randy Rijkschroeff
// @updateURL    https://github.com/r2cool/sayyeah-bunny/raw/main/sayyeah.user.js
// @downloadURL  https://github.com/r2cool/sayyeah-bunny/raw/main/sayyeah.user.js
// @match        https://dash.bunny.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bunny.net
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';
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
    if (window.onurlchange === null) {
        // feature is supported
        window.addEventListener('urlchange', (info) => {
            waitForElm('[label="Video ID"] input').then((elm) => {
                var copy_button = document.createElement('button');
                copy_button.innerText = "Kopieer link";
                copy_button.classList.add("mt-3", "bn-button", "bn-button--lg", "bn-button__item-style--primary");
                copy_button.setAttribute('id','but1');
                document.querySelectorAll('[label="Video ID"]')[0].append(copy_button);
                copy_button.addEventListener("click", () => {
                    GM_setClipboard('https://video.sayyeah.nl/' + document.querySelectorAll('[label="Video ID"] input')[0].value);
                });
            });
        });
    }
})();
