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
        if (msg.content.startsWith('XP.site.')) msg.reply('There are no properties for \`site\`');
        else if (typeof msgMatch[2] === 'undefined') msg.reply('https://x-plane.com');
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
        if (msg.content.startsWith('XP.help.')) msg.reply('That is not an availible property for \`help\`');
        else if (typeof msgMatch[1] !== 'undefined' && msgMatch[1].startsWith('(') && msgMatch[1].endsWith(')')) msg.reply('There are no selectors for \`help\`');
        else msg.reply('View our current commands at https://docs.google.com/spreadsheets/d/1jYaT-wTee34skK6t5ZNvOKdhtRBiUn0yMPVpodmcajg/edit?usp=sharing');
      }
      else if (msgMatch[1] === 'github') {
        if (msg.content.startsWith('XP.github.')) msg.reply('That is not an availible property for \`github\`');
        else if (typeof msgMatch[1] !== 'undefined' && msgMatch[1].startsWith('(') && msgMatch[1].endsWith(')')) msg.reply('There are no selectors for \`github\`');
        else msg.reply('https://github.com/lectrician1/X-Plane-11')
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
          if (msg.content.startsWith('XP.add.role.')) msg.reply('There are no properties for \`role\`');
          else if (typeof msgMatch[3] === 'undefined') {
            msg.reply('What role would you like to have?');
            
            const filter = m => m.content.length() > 0;
            const collector = msg.channel.createMessageCollector(filter, { max: 3 });
            collector.on('collect', c => {
              if (c !== 'stop') {
                if (roles.indexOf(c) > -1) {
                  msg.member.addRole(roles.get(c))
                }
                else {
                  if (collector.collected.length() !== 3) {
                    msg.reply('That role doesn\'t exist. Please type in another one or \`stop\` to stop asking.')
                  }
                  else msg.reply('That role doesn\'t exist. Please retype the command to start over.')
                }
              }
              else {
                collector.stop()
              }
            });
          }
          else if (typeof msgMatch[3] !== 'undefined' && msgMatch[3].startsWith('(') && msgMatch[3].endsWith(')')) {
            if (msgMatch[3].length() > 2) {
              var request = roles.indexOf(msgMatch[3].slice(1, -1))
              if (request > -1) {
                msg.member.addRole(roles.get(request))
              }
              else {
                msg.reply('That role doesn\'t exist.')
              }
            }
            else msg.reply('Please provide a role you would like to give yourself.')
          }
        }
        else if (msg.content.startsWith('XP.add.')) msg.reply('The only availible property for \`add\` is \`role\`');
        else if (typeof msgMatch[2] !== 'undefined' && msgMatch[1].startsWith('(') && msgMatch[2].endsWith(')')) msg.reply('There are no selectors for \`add\`');
        else msg.reply('You must use the property \`role\`for \`add\`');
      }
      else if (msg.content.startsWith('XP.')) msg.reply('That is not an availible property for \`XP\`');
      else if (typeof msgMatch[1] !== 'undefined' && msgMatch[1].startsWith('(') && msgMatch[1].endsWith(')')) msg.reply('There are no selectors for \`XP\`');
    }
  }
});

client.login(process.env.token);
