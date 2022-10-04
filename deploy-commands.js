const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	//info
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),

	//achievements
	new SlashCommandBuilder().setName('achievements').setDescription('Replies with something having to do with an achievement'),
	new SlashCommandBuilder().setName('platforms').setDescription('replies with a list of connected accounts'),
	new SlashCommandBuilder()
		.setName('games')
		.setDescription('Replies with a list of shared games between two users')
		.addSubcommand( subcommand => subcommand
			.setName('user')
			.setDescription('asks for a user to comapre games with')
			.addUserOption(option => option.setName('target').setDescription('name of the user')))
			.addSubcommand (subcommand => subcommand
				.setName('platform')
				.setDescription('asks user for the platform they want to make the comparison yet')
				.addUserOption(option => option.setName('platform').setDescription('game on said platform'))),

	//fun
	new SlashCommandBuilder().setName('randomcat').setDescription('Replies with a random picture of a cat!')
	]

	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);