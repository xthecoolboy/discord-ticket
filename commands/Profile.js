var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {
  const args = msg.content.slice(tokens.prefix.length+exports.help.name).trim().split(/ +/g);
  if (msg.mentions.users.size < 1) {
    let profile = client.getApply.get(msg.author.id);
    if (!profile) {
      const embed = new Discord.RichEmbed()
      .setAuthor('Error')
      .setDescription('You do not have any profile data!')
      .setColor(tokens.generic.colour.error)
      .setTimestamp()
      .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
      msg.channel.send(embed)
    } else {
      const embedProfile = new Discord.RichEmbed()
      .setDescription(`All data we currently hold on ${msg.author.tag}`)
      .addField(`Name :bookmark:`, `${profile.name}`, true)
      .addField(`Age :hash:`, `${profile.age}`, true)
      .addField(`MCM Profile :link:`, `[MCM](${profile.mcm})`, true)
      .addField(`Portfolio :bookmark_tabs:`, `[Portfolio](${profile.portfolio})`, true)
      .addField(`Position :paintbrush:`, `${msg.member.roles.map(r => `${r.name}`).join(' ').replace('@everyone', '')}`, true)
      .addField(`Paypal :gift:`, `${profile.paypal}`, true)
      .setColor(tokens.generic.colour.default)
      .setTimestamp()
      .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
      msg.channel.send(embedProfile)
    }
    return;
  }
  let user = msg.mentions.users.first();
  let profileUser = client.getApply.get(user.id);
  if (!profileUser) {
    const embed = new Discord.RichEmbed()
    .setAuthor('Error')
    .setDescription(`${user.username} does not have any profile data!`)
    .setColor(tokens.generic.colour.error)
    .setTimestamp()
    .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
    msg.channel.send(embed)
  } else {
    const embedProfileUser = new Discord.RichEmbed()
    .setDescription(`All data we currently hold on ${user.tag}`)
    .addField(`Name :bookmark:`, `${profileUser.name}`, true)
    .addField(`Age :hash:`, `${profileUser.age}`, true)
    .addField(`MCM Profile :link:`, `[MCM](${profileUser.mcm})`, true)
    .addField(`Portfolio :bookmark_tabs:`, `[Portfolio](${profileUser.portfolio})`, true)
    .addField(`Position :paintbrush:`, `${msg.member.roles.map(r => `${r.name}`).join(' ').replace('@everyone', '')}`, true)
    .addField(`Paypal :gift:`, `${profileUser.paypal}`, true)
    .setColor(tokens.generic.colour.default)
    .setTimestamp()
    .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
    msg.channel.send(embedProfileUser)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['profile']
};

exports.help = {
  name: 'profile',
  description: 'Shows the profile of the user',
  usage: 'profile'
};
