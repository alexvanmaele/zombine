var browser = require('./zombine.js');
browser.init().then(function()
{
    browser.browse('http://localhost:5000').then(function()
    {
        return browser.click('.continue-game-button a');
    }).then(function()
    {
        return browser.getPageProperty('window.location.href');
    }).then(function()
    {
        console.log('Ran');
    }).
    catch (function(err)
    {
        console.log('Error during execution:');
        console.log(err);
    }).
    finally(function()
    {
        browser.exit();
    });
});