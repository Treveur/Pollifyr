const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// for guild-based commandss
if (process.env.GUILD_ID) {
	rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] })
		.then(() => console.log('Successfully deleted all guild commands.'))
		.catch(console.error);
}
else {
	// for global commands
	rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
		.then(() => console.log('Successfully deleted all application commands.'))
		.catch(console.error);
}
