const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const jsdom = require("jsdom/lib/old-api.js");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'XP blog') {
    msg.reply('This feature is currently in development.');
  }
});

jsdom.env(
  "https://www.x-plane.com/blog/",
  ["https://code.jquery.com/jquery-3.3.1.min.js"],
  function (err, window) {
    var $ = window.jQuery;
    console.log($('article').get( 0 ));
  }
);

client.login(process.env.token);
