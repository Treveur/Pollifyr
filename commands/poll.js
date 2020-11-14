const Discord = require('discord.js');
const EmojiRegex = require('emoji-regex/RGI_Emoji.js');

module.exports = {
    name: 'poll',
    description: 'Simple way to create poll with emoji',
    async execute(message, args){
        const emotRegex = EmojiRegex();
        const emojiProp = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
        
        //Récupération des éléments entre quotes
        let options = message.content.match(/".*?"/g);
        options = options.map(x => x.replace(/"/g, '')).filter(x => x != '');
        
        //Récupération de la question
        const question = `📊 ${options.shift()}`;
        
        var emojis = [];

        options.forEach((element, index) => {
            let match = emotRegex.exec(element)

            if(match != null){
                emojis.push(match[0]);
            }else{
                let emoji = emojiProp.shift();
                emojis.push(emoji);
                options[index] = `${element} ${emoji}`;
            }

        }, options);

        let response = options.join('\n');

        //Create embed message
        const embedMessage = new Discord.MessageEmbed()
            .setColor('#8e24aa')
            .setAuthor('Sondage')
            .setTitle(question)
            .setDescription(response)
            .setTimestamp()
            .setFooter(`De ${message.author.username}`);        

        //Envoi message message
        let sendedMessage = await message.channel.send(embedMessage);

        //Affectation des réactions
        emojis.forEach(emote => {
            sendedMessage.react(emote)
            .catch((error) => console.error(error + " Emoji not found"));
        });
    }
}