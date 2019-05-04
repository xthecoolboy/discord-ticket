var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {
  const vouchChannel = client.channels.find(ch => ch.id == tokens.generic.ids.vouch);
	const args = msg.content.slice(tokens.prefix.length+exports.help.name).trim().split(/ +/g);
  if(msg.channel.name.startsWith(`a-`)) {
    msg.channel.delete();
		return;
	}
	if(!msg.channel.name.startsWith(`t-`)) {
		const embed = new Discord.RichEmbed()
	  .setAuthor(`${tokens.generic.messages.noPermissions}`)
	  .setDescription(`You can only execute this command in a ticket channel!`)
	  .setColor(tokens.generic.colour.error)
	  .setTimestamp()
	  .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
		msg.channel.send(embed)
		return;
	}
	const embed = new Discord.RichEmbed()
  .setAuthor(`Finish`)
  .setDescription(`Did you enjoy our service?`)
  .setColor(tokens.generic.colour.default)
  .setTimestamp()
  .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
  msg.channel.send(embed).then(async(newmsg) => {
		newmsg.react('✅').then(newmsg.react('❎'));
		setTimeout(function() {
			const collector = newmsg.createReactionCollector((reaction, user) => user.id === msg.author.id && reaction.emoji.name === "✅" || reaction.emoji.name === "❎").once("collect", reaction => {
				const chosen = reaction.emoji.name;
				if(chosen === "✅") {
					const embedVouch = new Discord.RichEmbed()
					.setAuthor('Leave a vouch')
					.setDescription('Please describe your experience with us and write a vouch!')
					.setColor(tokens.generic.colour.default)
				  .setTimestamp()
				  .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
					msg.channel.send(embedVouch).catch((error) => {console.log(error)});
					let collectorVouch = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 100000});
					collectorVouch.on(`collect`, msg => {
						let vouch = msg.content;
						let user = msg.author;
						msg.channel.send(embed).catch((error) => {console.log(error)});
						const embedVouch = new Discord.RichEmbed()
						.setDescription(`${vouch}`)
						.setColor(tokens.generic.colour.default)
					  .setTimestamp()
					  .setFooter(`Vouch by ${user.tag}`)
						vouchChannel.send(embedVouch).catch((error) => {console.log(error)});
            msg.channel.delete()
						collectorVouch.stop()
					})
					collector.stop();
				}
				if (chosen === '❎') {
          msg.channel.delete()
					collector.stop();
				}
			})
		}, 2000)
	})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['close']
};

exports.help = {
  name: 'close',
  description: 'Creates a new ticket',
  usage: 'close'
};
