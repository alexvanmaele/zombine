var browser = require('./zombine.js');
browser.init().then(function()
{
    browser.browse('http://www.google.com').then(function()
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