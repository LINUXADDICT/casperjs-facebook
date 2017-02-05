/**
 * Developed by Carlos Mario Mejia on 1/25/2017.
 */

var casper = require('casper').create({
    loadImages:false,
    verbose: false,
    //logLevel: 'debug'
});
var system = require('system');
var page = require('webpage').create();

var args = system.args;
var username = casper.cli.get('user');
var pass = casper.cli.get('pass');
var login_url = 'https:/facebook.com';

//set browser user agent
casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11");
casper.options.viewportSize = { width: 1200, height: 1200 };
casper.options.waitTimeout = 300000;

casper.start(login_url, function () {
    casper.fill('form#login_form', {
        'email' : username,
        'pass' : pass
    }, true);
    console.log("Logging in....*****************************************************");
    this.capture('/tmp/1FBLogin.png');
});

//Clicks the profile button
casper.waitForSelector('.fbChatSidebar', function () {
    console.log("Clicks profile button*************************");
    this.click('.fbxWelcomeBoxBlock');
    this.capture('/tmp/2FBWall.png');
});

//Screenshot to the profile page
casper.waitForSelector('#recent_capsule_container', function () {
    console.log("Profile loaded*************************");
    this.capture('/tmp/3FBProfile.png');
});

casper.run();