const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// Permet d'intéragir avec le client discord
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// const commandBody = message.content.slice(prefix.length);
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if(!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('Une erreur est survenue lors de l\'exécution de la commande');
	}
});

// Permet au bot de se connecter avec son token
client.login(process.env.TOKEN);