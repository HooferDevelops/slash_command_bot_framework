const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(`Fetch the bot\'s ping.`),
	async execute(client, interaction, config) {
		var start_time = new Date().getTime();

		const ping = new Discord.MessageEmbed()
		.setColor(config.embed_color)
		.setTitle('🏓 Pinging...')
		.setDescription(`Checking latency, just a second.`)	
		
		await interaction.reply({ embeds: [ping]});

		var ping_time = new Date().getTime() - start_time;
		var user_name = interaction.user.username

    /*var guild = client.guilds.cache.get("865737627712749579")
    var moderators = []
    guild.roles.cache.get("875877456714821702").members.map(m=>moderators.push(m.id));
    console.log(moderators)*/
		var moderators = [
			"NKGaming",
			"eg",
			"NovalFuzzy",
			"Aydxn",
			"Vaxeal"
		]
		var facts = [
			`${user_name} is a pretty cool person if you ask me.`,
			"During Early Alpha, there were some *interesting* items in the game. Some may know of these, some may not.",
			"You can sell your sign at the wood dropoff.",
			"You can stay up to date with new content & bug fixes by paying attention to <#867175830560178216>.",
			`During certain milestones, "Pink Wood" will spawn in the currently on-going servers.`,
			"Sometimes we'll post sneak peeks of upcoming stuff in <#869009042343854113>, so be on the lookout 👀",
			`${moderators[Math.floor(Math.random()*moderators.length)]} is the best mod`
		]
		var randomFact = facts[Math.floor(Math.random()*facts.length)]

		let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

    var pong = new Discord.MessageEmbed()
    .setColor(config.embed_color)
    .setTitle('🏓 Pong!')
    .setDescription(`**Fun Fact:** ${randomFact}`)

		pong.addFields(
			{
				name: '⏱ Bot Latency',
				value: `**${ping_time}** ms`,
				inline: true
			},
			{
				name: '💓 API Latency',
				value: `**${Math.round(client.ws.ping)}** ms`,
				inline: true
			}/*,
			{
				name: 'Bot Uptime',
				value: `**${hours}**hr(s) and **${minutes}**min(s)`,
				inline: true
			}*/
		)
		
		await interaction.editReply({ embeds: [pong]})
	},
};