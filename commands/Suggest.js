var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {
  const args = msg.content.slice(tokens.prefix.length+exports.help.name).trim().split(/ +/g);

  if (!args[1]) {
    const embeda = new Discord.RichEmbed()
      .setDescription("Enter a suggestion!")
      .setColor(tokens.generic.colour.default)
      .setTimestamp()
      .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
    msg.channel.send(embeda).catch((error) => {console.log(error)})
    return;
  }

  var suggestion = args.splice(1).join(" ");
  let suggestionChan = client.channels.find(ch => ch.id == `${tokens.generic.ids.suggestions}`);
  const embed = new Discord.RichEmbed()
    .setDescription(suggestion)
    .setColor(tokens.generic.colour.default)
    .setTimestamp()
    .setFooter(`Suggestion by ${msg.author.tag}`)
  suggestionChan.send(embed).catch((error) => {console.log(error)}).then(cnl => {
    cnl.react('✅')
    cnl.react('❌')
  })
  const embedc = new Discord.RichEmbed()
    .setDescription("Your suggestion was sent through :)")
    .setColor(tokens.generic.colour.default)
    .setTimestamp()
    .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
  msg.channel.send(
    embedc,
    '',
    { disableEveryone: true }
  ).catch((error) => {client.channels.get(tokens.logID).send(error); console.log(error)})

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['suggest']
};

exports.help = {
  name: 'suggest',
  description: 'Opens shop',
  usage: 'suggest'
};
