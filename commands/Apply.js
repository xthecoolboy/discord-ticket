var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {
  const embed = new Discord.RichEmbed()
	.setAuthor(`New Application`)
	.setDescription(`I created a new application for you #a-${msg.author.username}`)
	.setColor(tokens.generic.colour.default)
	.setTimestamp()
	.setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
	msg.channel.send(embed)
  msg.guild.createChannel(`t-${msg.author.username}`, 'text').then(async c => {
    c.setParent(tokens.generic.ids.apply)
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
    const embed = new Discord.RichEmbed()
    .setAuthor('The bot will now ask you a few questions')
    .setDescription('Start by mentioning the role you are applying for **EX** `@Bot Dev`')
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
      let applyingfor = msg.mentions.roles.first();
      const embedName = new Discord.RichEmbed()
      .setAuthor('The bot will now ask you a few questions')
      .setDescription('Tell us your **first** name')
      .setColor(tokens.generic.colour.default)
      .setTimestamp()
      .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
      c.send(embedName)
      collector.stop();
      let collector1 = new Discord.MessageCollector(c, m => m.author.id === msg.author.id, { time: 100000});
      collector1.on(`collect`, msg => {
        c.fetchMessages({
          limit: 2,
        }).then((messages) => {
          c.bulkDelete(messages).catch(error => log.error(error.stack));
        }).catch((error) => { log.error(error)});
        let name = msg.content;
        const embedAge = new Discord.RichEmbed()
        .setAuthor('The bot will now ask you a few questions')
        .setDescription('How old are you?')
        .setColor(tokens.generic.colour.default)
        .setTimestamp()
        .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
        c.send(embedAge)
        collector1.stop();
        let collector2 = new Discord.MessageCollector(c, m => m.author.id === msg.author.id, { time: 100000});
        collector2.on(`collect`, msg => {
          c.fetchMessages({
            limit: 2,
          }).then((messages) => {
            c.bulkDelete(messages).catch(error => log.error(error.stack));
          }).catch((error) => { log.error(error)});
          let age = msg.content;
          const embedMcm = new Discord.RichEmbed()
          .setAuthor('The bot will now ask you a few questions')
          .setDescription('Link your mc-market profile. (Include http or https in the link) If you do not have one reply with NA')
          .setColor(tokens.generic.colour.default)
          .setTimestamp()
          .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
          c.send(embedMcm)
          collector2.stop();
          let collector3 = new Discord.MessageCollector(c, m => m.author.id === msg.author.id, { time: 100000});
          collector3.on(`collect`, msg => {
            c.fetchMessages({
              limit: 2,
            }).then((messages) => {
              c.bulkDelete(messages).catch(error => log.error(error.stack));
            }).catch((error) => { log.error(error)});
            let mcm = msg.content;
            const embedPortfolio = new Discord.RichEmbed()
            .setAuthor('The bot will now ask you a few questions')
            .setDescription('Link your portfolio. (Include http or https in the link)')
            .setColor(tokens.generic.colour.default)
            .setTimestamp()
            .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
            c.send(embedPortfolio)
            collector3.stop();
            let collector4 = new Discord.MessageCollector(c, m => m.author.id === msg.author.id, { time: 100000});
            collector4.on(`collect`, msg => {
              c.fetchMessages({
                limit: 2,
              }).then((messages) => {
                c.bulkDelete(messages).catch(error => log.error(error.stack));
              }).catch((error) => { log.error(error)});
              let portfolio = msg.content;
              const embedPaypal = new Discord.RichEmbed()
              .setAuthor('The bot will now ask you a few questions')
              .setDescription('What is your paypal email? This is so we can pay you!')
              .setColor(tokens.generic.colour.default)
              .setTimestamp()
              .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
              c.send(embedPaypal)
              collector4.stop();
              let collector5 = new Discord.MessageCollector(c, m => m.author.id === msg.author.id, { time: 100000});
              collector5.on(`collect`, msg => {
                c.fetchMessages({
                  limit: 2,
                }).then((messages) => {
                  c.bulkDelete(messages).catch(error => log.error(error.stack));
                }).catch((error) => { log.error(error)});
                let paypal = msg.content;
                const embedCheck = new Discord.RichEmbed()
                .setDescription('Is all this information correct? If so react with ✅ to submit your application!')
                .addField(`Name :bookmark:`, `${name}`, true)
                .addField(`Age :hash:`, `${age}`, true)
                .addField(`MCM Profile :link:`, `[MCM](${mcm})`, true)
                .addField(`Portfolio :bookmark_tabs:`, `[Portfolio](${portfolio})`, true)
                .addField(`Position :paintbrush:`, `${applyingfor}`, true)
                .addField(`Paypal :gift:`, `${paypal}`, true)
                .setColor(tokens.generic.colour.default)
                .setTimestamp()
                .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
                collector5.stop();
                c.send(embedCheck).then(async(msg) => {
                  await msg.react('✅')
                  const collectorReact = msg.createReactionCollector((reaction, user) => user !== client.user);
                  collectorReact.on('collect', async (messageReaction) => {
                    embedCheck.setDescription(`Application by ${messageReaction.users.last()}`)
                    msg.edit(embedCheck)
                    let apply = client.getApply.get(messageReaction.users.last().id);
                    if (!apply) {
                      apply = {
                        userId: `${messageReaction.users.last().id}`,
                        name: `${name}`,
                        age: `${age}`,
                        paypal: `${paypal}`,
                        portfolio: `${portfolio}`,
                        mcm: `${mcm}`
                      }
                      client.setApply.run(apply);
                    }
                    collectorReact.stop();
                  })
                })
              })
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
  aliases: ['apply']
};

exports.help = {
  name: 'apply',
  description: 'Apply for a position',
  usage: 'apply'
};
