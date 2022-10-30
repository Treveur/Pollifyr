const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping !'),
	async execute(interaction) {
		const timeTaken = Date.now() - interaction.createdTimestamp;
		await interaction.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	},
};