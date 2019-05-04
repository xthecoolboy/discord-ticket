var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {
  const args = msg.content.slice(tokens.prefix.length+exports.help.name).trim().split(/ +/g);
  const vouchChannel = client.channels.find(ch => ch.id == tokens.generic.ids.vouch);
  const embedVouch = new Discord.RichEmbed()
  .setDescription(`${args.splice(1).join(" ")}`)
  .setColor(tokens.generic.colour.default)
  .setTimestamp()
  .setFooter(`Vouch by ${msg.author.tag}`)
  vouchChannel.send(embedVouch).catch((error) => {console.log(error)});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['vouch']
};

exports.help = {
  name: 'vouch',
  description: 'Vouches',
  usage: 'vouch'
};
