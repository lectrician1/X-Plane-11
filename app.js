const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const jsdom = require("jsdom/lib/old-api.js");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'XP blog') {
    jsdom.env(
      "https://www.x-plane.com/blog/",
      ["https://code.jquery.com/jquery-3.3.1.min.js"],
      function (err, window) {
        var $ = window.jQuery;
        msg.reply($('article').first().children('h2').first().children('a').first().attr('href'));
      }
    );
  }
});

client.login(process.env.token);
