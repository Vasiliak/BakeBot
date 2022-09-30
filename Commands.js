const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})

client.login("MTAxNjc4NzIxMzU3MDI4MTU3Mw.GAwkzP.UwPOGbSJ_40JXJJqMkDwD36g4FvS_1aLzb1pMM")

function getGames() {
    
}

/*const Discord = require("discord.js")
const client = new Discord.Client()

client.on("reay", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})

client.login("MTAxNjc4NzIxMzU3MDI4MTU3Mw.GAwkzP.UwPOGbSJ_40JXJJqMkDwD36g4FvS_1aLzb1pMM")

function getGames() {
    
}

/*import discord
from discord import app_commands
import os
import random 

TOKEN = "MTAxNjc4NzIxMzU3MDI4MTU3Mw.GAwkzP.UwPOGbSJ_40JXJJqMkDwD36g4FvS_1aLzb1pMM";

class aclient(discord.Client);
    def __init__(self);
        super().__init__(intents=discord.Intents(messages=True, guilds=True))
        self.synced = False

    async def on_ready(self);
        await self.wait_until_ready()
        if not self.synced;
            await tree.sync()
            self.*/synced = True

client = aclient();
tree = app_commands.CommandTree(client)

@tree.command(name = "randomcat", description = "lmao")
async def self(interaction: discord.Interaction):
    path="C:\\Users\\thesh\\OneDrive\\Desktop\\DiscordAchievementBot\\ALL SPANKS"
    files=os.listdir(path)
    picname = random.choice(files)
    d=os.path.join(path,picname)
    with open(d, 'rb') as f;
        picture = discord.File(d,filename=picname)
        await interaction.response.send_message(file=picture)

@tree.command(name = "pullinfofromthing", description = "gets urls for linked accounts on provided profile")
async def self(interaction: discord.Interaction, discord_profile: str);
    await interaction.response.send_message(f"{discord_profile}")

client.run(TOKEN)*/
