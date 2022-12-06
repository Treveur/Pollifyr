const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const EmojiRegex = require('emoji-regex');
const i18n = require('../utils/i18n');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setNameLocalizations({
			fr: 'poll',
		})
		.setDescription('Simple way to create poll with emoji')
		.setDescriptionLocalizations({
			fr: 'Une manière simple de créer des sondage avec des emojis',
		})
		.addStringOption((option) => option.setName('question')
			.setDescription('Question that will appear in the survey')
			.setNameLocalizations({
				fr: 'question',
			})
			.setDescriptionLocalizations({
				fr: 'Question qui apparaitra dans le songade',
			})
			.setRequired(true))
		.addStringOption((option) => option.setName('answers')
			.setDescription('Answers')
			.setNameLocalizations({
				fr: 'réponses',
			})
			.setDescriptionLocalizations({
				fr: 'Réponses',
			})
			.setRequired(true)),
	async execute(interaction) {
		// Create i18next object and define language
		const t = i18n(interaction.locale);
		const emojis = [];
		const emotRegex = EmojiRegex();
		const emojiProp = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

		// Get answers
		const options = getRawOptions(interaction.options.getString('answers'));

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

		// Create embed message
		const embedMessage = createEmbedMessageSurvey(`📊 ${interaction.options.getString('question')}`,
			options.join('\n'),
			interaction.member.nickname ?? interaction.user.username,
			t);

		// Send embed message
		const sendedMessage = await interaction.reply({ embeds: [embedMessage], fetchReply: true });

		// Add reactions
		emojis.forEach(emote => {
			sendedMessage.react(emote)
				.catch((error) => console.error(error + ' Emoji not found'));
		});
	},
};

/**
 * Create a formated embed message for the survey
 * @param {string} title title of embed message
 * @param {string} description description of the embed message
 * @param {string} userName author of the survey
 * @param {*} t i18next method
 * @returns
 */
function createEmbedMessageSurvey(title, description, userName, t) {
	return new EmbedBuilder()
		.setColor('#8e24aa')
		.setAuthor({ name: t('answer.survey') })
		.setTitle(title)
		.setDescription(description)
		.setTimestamp()
		.setFooter({
			text: t('answer.from',
				{ user: userName }),
		});
}


/**
 * Return a list of options
 * @param {string} answers
 * @returns
 */
function getRawOptions(answers) {
	const options = answers.match(/.*?;/g);
	// We remove empty string before returning an array with all options
	return options.map(x => x.replace(/;/g, '')).filter(x => x != '');
}