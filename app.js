const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'XP blog') {
    msg.reply('This feature is currently in development.');
  }
});

request('https://www.x-plane.com/blog/', function (error, response, body) {
  console.log('Request error:', error); // Print the error if one occurred
  console.log('Request statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('Request body:', body); // Print the HTML for the Google homepage.
});

jsdom.env({
  html: body,
  scripts: ['https://code.jquery.com/jquery-3.3.1.min.js']
}, function(err, window) {
  //Use jQuery just as in a regular HTML page
  const $ = window.jQuery;
  console.log($('title').text());
});

client.login(process.env.token);
