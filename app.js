const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const jsdom = require("jsdom/lib/old-api.js");
const port = process.env.PORT;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var msgMatch = msg.content.match(/\([^()]*\)|[^.]+(?=\([^()]*\))|[^.]+/g);
  if (msgMatch[0] === 'XP') {
    if (msgMatch[1] === 'site') {
      if (msgMatch[2] === '(blog)') {
        jsdom.env(
          "https://www.x-plane.com/blog/",
          ["https://code.jquery.com/jquery-3.3.1.min.js"],
          function (err, window) {
            var $ = window.jQuery;
            msg.reply($('article').first().children('h2').first().children('a').first().attr('href'));
          }
        );
      }
      else {
        msg.reply('https://x-plane.com');
      }
    }
    else if (msgMatch[1] === 'help') {
      msg.reply('The only commands currently are XP.site and XP.site(blog)');
    }
  }
});

client.login(process.env.token);
