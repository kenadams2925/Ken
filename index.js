const { readdirSync } = require('fs');
const { Client, Collection, GatewayIntentBits, Partials, ActivityType, ChannelType, Events, EmbedBuilder } = require('discord.js');
const keep_alive = require('./keep_alive');

const client = new Client({
    failIfNotExists: false,
    partials: [
        Partials.Channel
    ],
    intents: [
        GatewayIntentBits.DirectMessages, // comment or remove this if bot shouldn't receive DM messages
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
const pCommandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of pCommandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log(`${client.user.username} is ready!`);
    client.user.setActivity(".help", { type: ActivityType.Listening });
    const channel = await client.channels.fetch('1184586565121490954');
    channel.send('.pu 3'); 
   channel.send('.t')
   .then((msg) => {
                      msg.delete({ timeout: 2000 });
                 });
});

client.on('messageCreate', async message => {

    if(message.channel.type == ChannelType.DM){
          const channel = await client.channels.fetch('1190280111824580668');
  const embed = new EmbedBuilder();
  embed.setTitle(`Message Sent by ${message.author.tag}`);
  embed.setDescription(`**Message:** ${message.content}`);
  embed.setColor('Yellow');
  embed.setTimestamp();
  embed.setFooter({ text: 'DM Message' });
  channel.send({ embeds: [embed] });
    }
    
    const PREFIX = '.' 

    if(!message.content.toLowerCase().startsWith(PREFIX.toLowerCase())) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try{
        await command.run(client, message, args);

        if(message.channel.type == ChannelType.DM)
            console.log(`[CMD_DM] ${message.author.tag} (${message.author.id}) | ${message.content}`);
        else
            console.log(`[CMD] ${message.guild.name}(${message.guild.id}) | ${message.author.tag}(${message.author.id}) | ${message.content}`);
    }
    catch (error){
        if(message.channel.type == ChannelType.DM)
            console.log(`[CMD_DM_ERR] ${message.author.tag} (${message.author.id}) | ${message.content}`);
        else
            console.log(`[CMD_ERR] ${message.guild.name}(${message.guild.id}) | ${message.author.tag}(${message.author.id}) | ${message.content}`);

        console.error(error);

        message.reply('An error occurred!');
    }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
    
    if(oldMessage.channel.type == ChannelType.DM){
          const channel = await client.channels.fetch('1190280111824580668');
  const embed = new EmbedBuilder();
  embed.setAuthor({ name: oldMessage.author.tag, iconURL: oldMessage.author.displayAvatarURL() });
  embed.setTitle('Message Edited in DM Channel');
  embed.setDescription(`**Old Message:** ${oldMessage.content} \n **New Message:** ${newMessage.content}`);
  embed.setColor('Blue');
  embed.setTimestamp();
  embed.setFooter({ text: oldMessage.author.id });
  channel.send({ embeds: [embed] });
    }
    
  else {
  const channel = await client.channels.fetch('1190282148901572690');
  const embed = new EmbedBuilder();

  embed.setAuthor({ name: oldMessage.author.tag, iconURL: oldMessage.author.displayAvatarURL() });
  embed.setURL(oldMessage.url);
  embed.setTitle(`Message Edited in ${oldMessage.channel.name}`);
  embed.setDescription(`**Old Message:** ${oldMessage.content} \n **New Message:** ${newMessage.content}`);
  embed.setColor('Blue');
  embed.setTimestamp();
  embed.setFooter({ text: oldMessage.author.id });
  channel.send({ embeds: [embed] });
  }
});


client.on('messageDelete', async (message) => {

    
    if(message.channel.type == ChannelType.DM){
          const channel = await client.channels.fetch('1190280111824580668');
  const embed = new EmbedBuilder();
  embed.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() });
  embed.setTitle('Message Deleted in DM Channel');
  embed.setDescription(`**Message:** ${message.content}`);
  embed.setColor('Red');
  embed.setTimestamp();
  embed.setFooter({ text: message.author.id });
  channel.send({ embeds: [embed] });
    }
    else {
  const channel = await client.channels.fetch('1190282148901572690');
  const embed = new EmbedBuilder();
  embed.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() });
  embed.setTitle(`Message Deleted in ${message.channel.name}`);
  embed.setDescription(`**Message:** ${message.content}`);
  embed.setColor('Red');
  embed.setTimestamp();
  embed.setFooter({ text: message.author.id });
  channel.send({ embeds: [embed] });
    }
});



client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});

client.on('warn', console.warn);
client.on('error', console.error);

client.login(process.env.TOKEN);