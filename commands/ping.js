module.exports = {
	name: 'ping',
	description: 'Ping !',
	// eslint-disable-next-line no-unused-vars
	execute(message, arg) {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	},
};