const { EmbedBuilder } = require('discord.js');
const embed = new EmbedBuilder();

module.exports = {
    name: 'say',
    aliases: ['s'],
    description: 'Say anything with the bot',
    run: async (client, message, args) => {
        if (!message.author.id === "936474701000224768") {
            return message.channel.send(`You don't have the permission to use this command`);
        }

        // Delete the original message
        message.channel.bulkDelete(1);

        const text = args.join(' ');

        // Introduce a delay of 1 second (1000 milliseconds) before sending the new message
        setTimeout(() => {
            message.channel.send(text);
        }, 1000);
    }
}
