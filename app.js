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

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

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
      if (msgMatch[1] === 'ping') {
        if (msg.content.startsWith('XP.ping.')) msg.reply('There are no properties for \`ping\`.');
        else if (typeof msgMatch[3] !== 'undefined' && msgMatch[3].startsWith('(') && msgMatch[3].endsWith(')')) msg.reply('There are no methods for \`ping\`');
        else msg.reply(client.ping);
      }
      else if (msgMatch[1] === 'site') {
        if (msg.content.startsWith('XP.site.')) msg.reply('There are no properties for \`site\`.');
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
          else msg.reply('The only availible method of \`site\` is \`blog\`');
        }
        else msg.reply('https://x-plane.com');
      }
      else if (msgMatch[1] === 'help') {
        if (msgMatch[2] === 'examples') {
          if (msg.content.startsWith('XP.help.examples.')) msg.reply('There are no properties for \`examples\`');
          else if (typeof msgMatch[3] !== 'undefined' && msgMatch[3].startsWith('(') && msgMatch[3].endsWith(')')) msg.reply('There are no methods for \`examples\`');
          else {
            msg.reply('\n**An example** of a command that would add a role to your user would be: \`XP.add.role\`. This command has the properties \`.add\` - which is a property of \`XP\` that allows you to add various things to your user, and \`role\` - which is a property of \`.add\` that adds a role to your user. I will then ask you what role you would like to have and then give it to you. As you can see, properties are seperated by periods. \n\nNow a faster way to do this would be to include \`.role\`\'s method. This command would look like this: \`XP.add.role(*role*)\`. Just like before, \`add\` and \`role\` are properties, but this time, you take advantage of \`.role\`\'s method. As you can see, methods are indicated by parentheses.');
          }
        }
        else if (msg.content.startsWith('XP.help.')) msg.reply('The only availible property for \`help\` is \`examples\`.');
        else if (typeof msgMatch[1] !== 'undefined' && msgMatch[1].startsWith('(') && msgMatch[1].endsWith(')')) msg.reply('There are no methods for \`help\`');
        else msg.reply('**Hi!** My commands work using a system of properties and methods. The base property for me is \`XP\`. \n\n - You can find out **properties** of properties by typing the the \`.*\` property after the property you are looking for (e.g \`XP.*\` will give you all of the properties of \`XP\`. \n - You can find out **methods** of properties by indicating a method with no selectors ( \`()\` ) after the property you are looking for (e.g XP.() will give you all of the methods of \`XP\`. \n\n*If you want to learn more about how properties and methods work, try \`XP.help.examples\`.*');
      }
      else if (msgMatch[1] === 'github') {
        if (msg.content.startsWith('XP.github.')) msg.reply('There are no availible properties for \`github\`.');
        else if (typeof msgMatch[1] !== 'undefined' && msgMatch[1].startsWith('(') && msgMatch[1].endsWith(')')) msg.reply('There are no methods for \`github\`.');
        else msg.reply('https://github.com/lectrician1/X-Plane-11')
      }
      else if (msgMatch[1] === 'add') {
        var rolesA = [
          ['youtubers', '515266870085943297'],
          ['twitch streamers', '515266914746892290'],
          ['professional developers', '515267013745180697'],
          ['developers', '515573304602656836']
        ];
        let roles = new Map(rolesA);
        if (msgMatch[2] === 'role') {
          if (msg.content.startsWith('XP.add.role.')) msg.reply('There are no properties for \`role\`');
          else if (typeof msgMatch[3] === 'undefined') {
            msg.reply('What role would you like to have?');
            
            const filter = m => m.author.id !== '464952410280951819';
            const collector = msg.channel.createMessageCollector(filter, { max: 3 });
            collector.on('collect', c => {
              if (c.content !== 'stop') {
                if (roles.has(c.content.toLowerCase())) {
                  msg.member.addRole(roles.get(c.content.toLowerCase()));
                  msg.reply('The role ' + titleCase(c.content) + ' has been added to your user!');
                  collector.stop();
                }
                else {
                  if (collector.collected.size !== 3) {
                    msg.reply('That role doesn\'t exist. Please type in another one or \`stop\` to stop asking.');
                  }
                  else msg.reply('That role doesn\'t exist. Please retype the command to start over.');
                }
              }
              else {
                collector.stop()
              }
            });
          }
          else if (typeof msgMatch[3] !== 'undefined' && msgMatch[3].startsWith('(') && msgMatch[3].endsWith(')')) {
            if (msgMatch[3].length > 2) {
              if (roles.has(msgMatch[3].slice(1, -1))) {
                msg.member.addRole(roles.get(msgMatch[3].slice(1, -1).toLowerCase()));
                msg.reply('The role ' + titleCase(msgMatch[3].slice(1, -1)) + ' has been added to your user!');
              }
              else {
                msg.reply('That role doesn\'t exist.')
              }
            }
            else msg.reply('Please provide a role you would like to give yourself.')
          }
        }
        else if (msg.content.startsWith('XP.add.')) msg.reply('The only availible property for \`add\` is \`role\`');
        else if (typeof msgMatch[2] !== 'undefined' && msgMatch[2].startsWith('(') && msgMatch[2].endsWith(')')) msg.reply('There are no method for \`add\`');
        else msg.reply('The only property \`add\` is \`role\`.');
      }
      else if (msg.content.startsWith('XP.')) msg.reply('The availible properties for \`XP\` are \`site\`, \`help\`, \`github\`, and \`add\`');
      else if (typeof msgMatch[1] !== 'undefined' && msgMatch[1].startsWith('(') && msgMatch[1].endsWith(')')) msg.reply('There are no methods for \`XP\`');
    }
  }
  else if ((msg.channel.id === '515265124253040641' || msg.channel.id === '515265169581015061') && (typeof msg.attachments !== 'undefined' || typeof msg.embeds !== 'undefined')) {
    msg.react('👍')
      .catch(console.error);
  }
});

client.login(process.env.token);
