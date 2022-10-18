// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

const express = require('express');
const { port } = require('./config.json');

const app = express();

app.get('/', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'randomcat') {
		var fs = require('fs');
		var files = fs.readdirSync('all_cats')
		/* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
		let chosenFile = files[Math.floor(Math.random() * files.length)]
		await interaction.followUp({files: [chosenFile]});
	} else if (commandName === 'games') {
		await interaction.reply('Pong!');
	} else if (commandName === 'platforms'){
		await interaction.reply(`Connected Platforms Are: ${interaction.user.connections}`);
	}

});

client.login(token);