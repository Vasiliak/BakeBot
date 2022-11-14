// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Guild } = require('discord.js');
const { token, clientId, clientSecret, port } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
//client.login(token);


// Oauth2 setup
const { request } = require('undici');
const express = require('express');
//const { clientId, clientSecret, port } = require('./config.json');
const { get } = require('http');

const app = express();

app.get('/', async ({ query }, response) => {
	const { code } = query;

	if (code) {
		try {
			const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${port}`,
					scope: 'identify connections',
				}).toString(),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await tokenResponseData.body.json();
			console.log(oauthData);

			const userResult = await request('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			console.log(await userResult.body.json());
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error
			// tokenResponseData.statusCode will be 401
			console.error(error);
		}
	}

	return response.sendFile('index.html', { root: '.' });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));


// Command interactions
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
		const userPlatforms = await get(`http://discord.com/api/users/${interaction.user.id}/connections/type`); //Sends a request to discord's API, need to look into this more... (Note bottom of https://discord.com/developers/docs/resources/user)
		//console.log(userPlatforms);
		await interaction.reply(`Connected Platforms Are: ${/*interaction.user.connections*/ userPlatforms}`);
		console.log(Object.values(userPlatforms)); //THIS DOES NOT WORK CURRENTLY, Object values can not be broken down to string for some reason
	}

});

client.login(token);