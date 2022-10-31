const { EmbedBuilder } = require('discord.js');
const EmojiRegex = require('emoji-regex');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Simple way to create poll with emoji')
		.addStringOption((option) =>
			option.setName('question')
				.setDescription('Question that will appear in the survey')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('answers')
				.setDescription('Answers')
				.setRequired(true)),

	async execute(interaction) {
		const emotRegex = EmojiRegex();
		const emojiProp = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

		const questionOption = interaction.options.getString('question');
		const answers = interaction.options.getString('answers');

		// Get label question
		const question = `📊 ${questionOption}`;
		const emojis = [];

		// Get answers
		let options = answers.match(/.*?;/g);
		options = options.map(x => x.replace(/;/g, '')).filter(x => x != '');

		options.forEach((element, index) => {

			const match = element.match(emotRegex);

			if (match != null) {
				emojis.push(match[0]);
			}
			else {
				const emoji = emojiProp.shift();
				emojis.push(emoji);
				options[index] = `${element} ${emoji}`;
			}

		}, options);

		const response = options.join('\n');

		// Create embed message
		const embedMessage = new EmbedBuilder()
			.setColor('#8e24aa')
			.setAuthor({ name: 'Survey' })
			.setTitle(question)
			.setDescription(response)
			.setTimestamp()
			.setFooter({ text: `From ${interaction.member.nickname ?? interaction.user.username}` });

		// Send embed message
		const sendedMessage = await interaction.reply({ embeds: [embedMessage], fetchReply: true });

		// Add reactions
		emojis.forEach(emote => {
			sendedMessage.react(emote)
				.catch((error) => console.error(error + ' Emoji not found'));
		});
	},
};