const Discord = require("discord.js")

module.exports = (client, config) => {
	client.on("ready", () => {
		console.log("client loaded!")
	})
}