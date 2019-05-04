var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {
	const commissionChannel = client.channels.find(ch => ch.id == tokens.generic.ids.commissions);
	const args = msg.content.slice(tokens.prefix.length+exports.help.name).trim().split(/ +/g);
	if (!args[1]) {
		const embed = new Discord.RichEmbed()
		.setAuthor(tokens.generic.messages.invalidSyntax)
		.setDescription('You need to enter a topic! **EX** `new <topic>`')
		.setColor(tokens.generic.colour.warn)
		.setTimestamp()
		.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
		msg.channel.send(embed)
		return;
	}
	const embed = new Discord.RichEmbed()
	.setAuthor(`New Ticket`)
	.setDescription(`I created a new support ticket for you #t-${msg.author.username}`)
	.setColor(tokens.generic.colour.default)
	.setTimestamp()
	.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
	msg.channel.send(embed)
	var topic = args.splice(1).join(" ");
	msg.guild.createChannel(`t-${msg.author.username}`, 'text').then(async c => {
		var ticketChannel = c.channel;
		c.setParent(tokens.generic.ids.tickets)
		let everyone = msg.guild.id;
		let user = msg.author.id;

		c.overwritePermissions(everyone, {
			READ_MESSAGES: false,
			SEND_MESSAGES: false
		})
		c.overwritePermissions(user, {
			READ_MESSAGES: true,
			SEND_MESSAGES: true
		})
		let client = msg.author;
		const embed = new Discord.RichEmbed()
		.setAuthor('The bot will now ask you a few questions about your order')
		.setDescription('Start by mentioning the role that can complete your request **EX** `@Bot Dev`')
		.setColor(tokens.generic.colour.default)
		.setTimestamp()
		.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
		c.send(embed)
		let collector = new Discord.MessageCollector(c, m => m.author.id === msg.author.id, { time: 100000});
		collector.on(`collect`, msg => {
			c.fetchMessages({
				limit: 2,
			}).then((messages) => {
				c.bulkDelete(messages).catch(error => log.error(error.stack));
			}).catch((error) => { log.error(error)});
			let freelancer = msg.mentions.roles.first();
			const embedBudget = new Discord.RichEmbed()
			.setAuthor('The bot will now ask you a few questions about your order')
			.setDescription('Now, please tell us your budget and currency **EX** `15 USD`')
			.setColor(tokens.generic.colour.default)
			.setTimestamp()
			.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
			c.send(embedBudget)
			collector.stop();
			collector = new Discord.MessageCollector(c, m => m.author.id === msg.author.id, { time: 100000 });
			collector.on(`collect`, msg => {
				c.fetchMessages({
					limit: 2,
				}).then((messages) => {
					c.bulkDelete(messages).catch(error => log.error(error.stack));
				}).catch((error) => { log.error(error)});
				let budget = msg.content;
				const embedTimeframe = new Discord.RichEmbed()
				.setAuthor('The bot will now ask you a few questions about your order')
				.setDescription('How long do you want this to take? **EX** `1 week`')
				.setColor(tokens.generic.colour.default)
				.setTimestamp()
				.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
				c.send(embedTimeframe)
				collector.stop();
				collector = new Discord.MessageCollector(c, m => m.author.id === msg.author.id, { time: 100000 });
				collector.on(`collect`, msg => {
					c.fetchMessages({
						limit: 2,
					}).then((messages) => {
						c.bulkDelete(messages).catch(error => log.error(error.stack));
					}).catch((error) => { log.error(error)});
					let timeframe = msg.content;
					const embedDetails = new Discord.RichEmbed()
					.setAuthor('The bot will now ask you a few questions about your order')
					.setDescription('Please give us as much details as possible about what you want.')
					.setColor(tokens.generic.colour.default)
					.setTimestamp()
					.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
					c.send(embedDetails)
					collector.stop();
					collector = new Discord.MessageCollector(c, m => m.author.id === msg.author.id, { time: 100000 });
					collector.on(`collect`, msg => {
						c.fetchMessages({
							limit: 2,
						}).then((messages) => {
							c.bulkDelete(messages).catch(error => log.error(error.stack));
						}).catch((error) => { log.error(error)});
						let details = msg.content;
						const embedCommission = new Discord.RichEmbed()
						.setAuthor(`Request`)
						.setDescription(`**Description**:\n${details}`)
						.addField(`**Client**:`, client.tag, true)
						.addField(`**Budget**:`, budget, true)
						.addField(`**Time frame**:`, timeframe, true)
						.addField(`**Did we get it right?**:`, `If we got all the details correct, click the check mark to submit. The cross will delete this ticket and you may start over with ${tokens.prefix}new`, true)
						.setColor(tokens.generic.colour.default)
						.setTimestamp()
						.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
						collector.stop();
						c.send(embedCommission).then(async(newmsg) => {
							newmsg.react('✅').then(newmsg.react('❎'));
							setTimeout(function() {
							const collector = newmsg.createReactionCollector((reaction, user) => user.id === msg.author.id && reaction.emoji.name === "✅" || reaction.emoji.name === "❎").once("collect", reaction => {
								const chosen = reaction.emoji.name;
								if(chosen === "✅") {
									const embedCommissionEdited = new Discord.RichEmbed()
									.setAuthor(`Request`)
									.setDescription(`**Description**:\n${details}`)
									.addField(`**Client**:`, client.tag, true)
									.addField(`**Budget**:`, budget, true)
									.addField(`**Time frame**:`, timeframe, true)
									.addField(`**Did we get it right?**:`, `Thanks! We posted your commission to the developers! A freelancer should be with you soon!`, true)
									.setColor(tokens.generic.colour.default)
									.setTimestamp()
									.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
									newmsg.edit(embedCommissionEdited);
									const embedCommission = new Discord.RichEmbed()
									.setAuthor(`Request`)
									.setDescription(`**Description**:\n${details}`)
									.addField(`**Client**:`, client.tag, true)
									.addField(`**Budget**:`, budget, true)
									.addField(`**Time frame**:`, timeframe, true)
									.addField(`**Claimed**:`, `none`, true)
									.setColor(tokens.generic.colour.default)
									.setTimestamp()
									.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
									commissionChannel.send(freelancer + ' I have a commission for you!')
									commissionChannel.send(embedCommission).then(async(msg) => {
										await msg.react("✅");
										setTimeout(function() {
										const collectorCommission = msg.createReactionCollector((reaction, user) => user !== client.user);
										collectorCommission.on('collect', async (messageReaction) => {
											const embedEdited = new Discord.RichEmbed()
											.setAuthor(`Commission Claimed`)
											.setDescription(`**Description**:\n${details}`)
											.addField(`**Client**:`, client.tag, true)
											.addField(`**Budget**:`, budget, true)
											.addField(`**Time frame**:`, timeframe, true)
											.addField(`**Claimed**:`, `${messageReaction.users.last()}`, true)
											.setColor(tokens.generic.colour.default)
											.setTimestamp()
											.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
											msg.edit(embedEdited).then(msg => {
												const embedClaimed = new Discord.RichEmbed()
												.setAuthor(`Commission Claimed`)
												.setDescription(`Looks like we found the right freelancer for the job! ${messageReaction.users.last()} will be assisting you with your Commission!`)
												.setColor(tokens.generic.colour.default)
												.setTimestamp()
												.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
												c.send(embedClaimed)
												c.overwritePermissions(messageReaction.users.last().id, {
													READ_MESSAGES: true,
													SEND_MESSAGES: true
												})
											})
											collectorCommission.stop();
										})
										}, 2000)
									})
									collector.stop();
								}
								if (chosen === "❎") {
									collector.stop();
									newmsg.channel.delete();
								}
							})
						}, 2000)
						})
					})
				})
			})
		})
	})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['new']
};

exports.help = {
  name: 'new',
  description: 'Creates a new ticket',
  usage: 'new'
};
