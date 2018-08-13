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
      if (msgMatch[2].length === 0) msg.reply('https://x-plane.com');
      else if (msgMatch[2] === '(blog)') {
        jsdom.env(
          "https://www.x-plane.com/blog/",
          ["https://code.jquery.com/jquery-3.3.1.min.js"],
          function (err, window) {
            var $ = window.jQuery;
            msg.reply($('article').first().children('h2').first().children('a').first().attr('href'));
          }
        );
      }
      else if (msgMatch[2].startsWith('(') && msgMatch[2].endsWith(')')) msg.reply('That is not an availible selector for \`site\`');
      else msg.reply('That is not an availible property for \`site\`');
    }
    else if (msgMatch[1] === 'help') {
      msg.reply('View our current commands at https://docs.google.com/spreadsheets/d/1jYaT-wTee34skK6t5ZNvOKdhtRBiUn0yMPVpodmcajg/edit?usp=sharing');
    }
    else if (msgMatch[1] === 'github') {
      msg.reply('https://github.com/lectrician1/X-Plane-11')
    }
    else if (msgMatch[1] === 'add' || msgMatch[1] === 'give' || msgMatch[1] === 'get') {
      if (msgMatch[2].length === 0) msg.reply('The only availible property for \`add\` is \`role\`');
      else if (msgMatch[2] === 'role' || msgMatch[2] === 'roles') {
        if (msgMatch[2].length === 0) msg.reply('Plese spell the names of the roles you would like to get.');
        else if (msgMatch[2] === '
        
    else if (msgMatch[1].startsWith('(') && msgMatch[1].endsWith(')')) msg.reply('That is not an availible selector for \`XP\`');
    else if (msgMatch[1].length > 0) msg.reply('That is not an availible property for \`XP\`');
  }
});

client.login(process.env.token);
