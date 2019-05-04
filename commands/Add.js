var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {
	const args = msg.content.slice(tokens.prefix.length+exports.help.name).trim().split(/ +/g);
	if(!msg.channel.name.startsWith(`t-`)) {
		const embed = new Discord.RichEmbed()
		.setAuthor(tokens.generic.messages.error)
		.setDescription('This Command can only be executed in a Tickets Channel')
		.setColor(tokens.generic.colour.default)
		.setTimestamp()
		.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
		msg.channel.send(embed)
		return;
	}
	let user = msg.mentions.users.first();
  if (msg.mentions.users.size < 1) {
    const embed = new Discord.RichEmbed()
		.setAuthor(tokens.generic.messages.invalidSyntax)
		.setDescription('You need to mention a user to add!')
		.setColor(tokens.generic.colour.default)
		.setTimestamp()
		.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
		msg.channel.send(embed)
		return;
  }

  msg.channel.overwritePermissions(user.id, {
    READ_MESSAGES: true,
    SEND_MESSAGES: true
  })
	const embed = new Discord.RichEmbed()
  .setAuthor(tokens.generic.messages.invalidSyntax)
  .setDescription(`${user} was added to the ticket!`)
  .setColor(tokens.generic.colour.default)
  .setTimestamp()
  .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
  msg.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['add']
};

exports.help = {
  name: 'add',
  description: 'Adds a user to the ticket',
  usage: 'add'
};
