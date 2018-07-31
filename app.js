const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const jsdom = require("jsdom/lib/old-api.js");
const http = require('http');
const port = process.env.PORT;

const requestHandler = (request, response) => {
  console.log(request.url);
  response.end('server requested');
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Help: XP.help');
});

client.on('message', msg => {
  var msgMatch = msg.content.match(/\([^()]*\)|[^.]+(?=\([^()]*\))|[^.]+/g);
  if (msgMatch[0] === 'XP') {
    if (msgMatch[1] === 'site') {
      if (msgMatch[2] === 'blog') {
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
      msg.reply('View our current commands at https://docs.google.com/spreadsheets/d/1jYaT-wTee34skK6t5ZNvOKdhtRBiUn0yMPVpodmcajg/edit?usp=sharing');
    }
    else if (msgMatch[1] === 'github') {
      msg.reply('https://github.com/lectrician1/X-Plane-11')
    }
  }
});

client.login(process.env.token);
