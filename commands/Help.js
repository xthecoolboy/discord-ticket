var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {
	const embed = new Discord.RichEmbed()
	.setAuthor('Help', client.user.avatarURL)
	.setDescription(`Prefix: ${tokens.prefix}\n\nnew | Opens a ticket\nClose | Closes the ticket\nAdd | Adds a user to the ticket\nRemove | Removes a user from the ticket\napply | Applys to be a freelancer\nprofile | Views a users profile`)
	.setColor(tokens.generic.colour.default)
	.setTimestamp()
	.setFooter(`Made with ❤ by !AmANoot#0123 (iamanoot.xyz)`)
	msg.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help']
};

exports.help = {
  name: 'help',
  description: 'Helps the user',
  usage: 'help'
};
