/*
    Ideally, make something like this:

            browser.browse('www.example.com')
            .waitFor({element: '.popup-text', css: 'width: 100%'})
            .click('.yes-button')
            .waitFor({element: '.login-form', css: 'bottom: 0'})
            .input('#username', 'testuser')
            .input('#password', 'testpassword')
            .click('.login-button')
            .waitFor({element: '.user-profile', css: 'display: block'})
            .takeScreenshot('screencap.png');
*/
var promise = require('bluebird');
var phantom = require('phantom');
var browser,
    phantomInstance; // set these in constructor
module.exports = {
    //TODO: make proper constructor
    init: function()
    {
        return new promise(function(resolve, reject)
        {
            console.log('Creating phantom...');
            phantom.create(function(ph)
            {
                console.log('Creating phantom instance...');
                phantomInstance = ph;
                console.log('Creating browser...');
                ph.createPage(function(page)
                {
                    browser = promise.promisifyAll(page);
                    console.log('Browser created!');
                    resolve();
                });
            });
        });
    },
    browse: function(url)
    {
        return new promise(function(resolve, reject)
        {
            console.log(browser === undefined ? 'browser undefined' : 'browser ok');
            console.log(url === undefined ? 'url undefined' : 'url ok');
            browser.open(url, function(status)
            {
                console.log('Status: ' + status);
                // TODO: write this with promises
                // (currently bugs up because of the return, so this is the only way)
                browser.evaluateAsync(function()
                {
                    return document.title;
                }, function(result)
                {
                    console.log('Page title is ' + result);
                    resolve();
                });
            });
        });
    },
    click: function(selector)
    {
        return new promise(function(resolve, reject)
            {
                browser.evaluateAsync(function(selector)
                {
                    $(selector).click();
                    return window.location.href;
                },
                function(result)
                {
                    console.log('Current URL: ' + result);
                    resolve();
                },
                selector);
            });
    },
    getPageProperty: function(property)
    {
                return new promise(function(resolve, reject)
            {
                browser.evaluateAsync(function(property)
                {
                    var result = eval(property);
                    return result;
                },
                function(result)
                {
                    console.log('Result: ' + result);
                    resolve();
                },
                property);
            });
    },
    exit: function()
    {
        phantomInstance.exit();
    }
};