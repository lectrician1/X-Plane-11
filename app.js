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
  if (msg.channel.id === '515579111939375114') {
    var msgMatch = msg.content.match(/\([^()]*\)|[^.]+(?=\([^()]*\))|[^.]+/g);
    if (msgMatch[0] === 'XP') {
      if (msgMatch[1] === 'site') {
        if (msgMatch[2].length === 0) msg.reply('https://x-plane.com');
        else if (msgMatch[2].startsWith('(') && msgMatch[2].endsWith(')')) {
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
          else msg.reply('The only availible selector of \`site\` is \`blog\`');
        }
        else msg.reply('There are no properties of \`site\`');
      }
      else if (msgMatch[1] === 'help') {
        msg.reply('View our current commands at https://docs.google.com/spreadsheets/d/1jYaT-wTee34skK6t5ZNvOKdhtRBiUn0yMPVpodmcajg/edit?usp=sharing');
      }
      else if (msgMatch[1] === 'github') {
        msg.reply('https://github.com/lectrician1/X-Plane-11')
      }
      else if (msgMatch[1] === 'add') {
        var rolesA = [
          ['youtubers', 515266870085943297],
          ['twitch streamers', 515266914746892290],
          ['professional developers', 515267013745180697],
          ['developers', 515573304602656836]
        ];
        let roles = new Map(rolesA);
        if (msgMatch[2] === 'role') {
          if (msgMatch[3].startsWith('(') && msgMatch[3].endsWith(')')) {
            var request = roles.indexOf(msgMatch[3].slice(1, -1))
            if (request > -1) {
              msg.member.addRole(roles.get(request))
            }
            else {
              msg.reply('That role doesn\'t exist.')
            }
          }
          else if (msgMatch[3].length === 0) msg.reply('There are no properties of \`role\`');
          else {
            msg.reply('What role would you like to have?');
            
            const filter = m => ;
            const collector = msg.channel.createMessageCollector(filter, { max: 1 });
            collector.on('collect', c => {
              if (c !== 'stop') {
                if (roles.indexOf(c.values()) > -1) {
                  msg.member.addRole(roles.get(c.values()))
                }
                else {
                  msg.reply('That role doesn\'t exist. Please type in another one or \`stop\` to stop asking.')
                }
              }
              else {
                collector.stop()
              }
            });
          }
        }
        else msg.reply('The only availible property for \`add\` is \`role(s)\`');

      else if (msgMatch[1].startsWith('(') && msgMatch[1].endsWith(')')) msg.reply('That is not an availible selector for \`XP\`');
      else if (msgMatch[1].length > 0) msg.reply('That is not an availible property for \`XP\`');
    }
  }
});

client.login(process.env.token);
