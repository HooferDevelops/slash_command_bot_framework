const { Client, Intents, Collection } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const fs = require('fs')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]})

var config = JSON.parse(fs.readFileSync("config.json"))

client.once("ready", () => {
	const commands = []
	const commands_information = new Collection();
	const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
	const automaticFiles = fs.readdirSync("./automatic").filter(file => file.endsWith(".js"))

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`)
		console.log(`new command! ${command.data.name}`)
		commands.push(command.data.toJSON())
		commands_information.set(command.data.name, command);
	}

	for (const file of automaticFiles) {
		const automatic = require(`./automatic/${file}`)
		try {
			automatic(client, config)
		} catch {
			console.log("Failed to load " + file)
		}
	}

	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;

		const { commandName } = interaction;

		if (!commands_information.has(commandName)) return;

		try {
			await commands_information.get(commandName).execute(client, interaction, config);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	});




	const rest = new REST({ version: '9' }).setToken(config.token);

	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');

			await rest.put(
				Routes.applicationGuildCommands(config.client, config.guild),
				{ body: commands },
			);

			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();
})


client.login(config.token)