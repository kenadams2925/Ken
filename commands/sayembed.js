const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'sayembed',
    aliases: ['se'],
    description: 'Say anything with the bot',
    run: async (client, message, args) => {
        const embed = new EmbedBuilder(); // Create a new instance
        
         // Check if the message author is you
        if (!message.author.id === "936474701000224768") {
            return message.channel.send(`You don't have the permission to use this command`);
        }

          // Delete the original message
        message.channel.bulkDelete(1);

        const text = args.join(' ');

        // Introduce a delay of 1 second (1000 milliseconds) before sending the new message
        setTimeout(() => {
            message.channel.send({ embeds: [embed] });
        }, 1000);
    }
}

