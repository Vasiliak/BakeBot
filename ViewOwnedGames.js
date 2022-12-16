import {MessageActionRow, MessageButton, MessageEmbed} from 'discord.js'

async function ViewOwnedGames(id) {
    // Constants

    const backId = 'back'
    const forwardId = 'forward'
    const backButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Back',
    emoji: '⬅️',
    customId: backId
    })
    const forwardButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Forward',
    emoji: '➡️',
    customId: forwardId
    })

    const {author, channel} = message
    const games = await SteamOwnedGames(id)

    /**
     * Creates an embed with games starting from an index.
     * @param {number} start The index to start from.
     * @returns {Promise<MessageEmbed>}
     */
    const generateEmbed = async start => {
    const current = games.slice(start, start + 10)

    return new MessageEmbed({
        title: `Showing owned games ${start + 1}-${start + current.length} out of ${games.length}`,
        fields: [ 
            { name: games[start] },
            { name: games[start + 1] },
            { name: games[start + 2] },
            { name: games[start + 3] },
            { name: games[start + 4] },
            { name: games[start + 5] },
            { name: games[start + 6] },
            { name: games[start + 7] },
            { name: games[start + 8] },
            { name: games[start + 9] }
        ]
    })
    }

    // Send the embed with the first 10 games
    const canFitOnOnePage = games.length <= 10
    const embedMessage = await channel.send({
    embeds: [await generateEmbed(0)],
    components: canFitOnOnePage
        ? []
        : [new MessageActionRow({components: [forwardButton]})]
    })
    // Exit if there is only one page of games
    if (canFitOnOnePage) return

        // Collect button interactions (when a user clicks a button),
        // but only when the button as clicked by the original message author
        const collector = embedMessage.createMessageComponentCollector({
        filter: ({user}) => user.id === author.id
    })

    let currentIndex = 0
    collector.on('collect', async interaction => {
        // Increase/decrease index
        interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)
        // Respond to interaction by updating message with new embed
        await interaction.update({
            embeds: [await generateEmbed(currentIndex)],
            components: [
            new MessageActionRow({
                components: [
                // back button if it isn't the start
                ...(currentIndex ? [backButton] : []),
                // forward button if it isn't the end
                ...(currentIndex + 10 < games.length ? [forwardButton] : [])
                ]
            })
            ]
        })
    });
}

ViewOwnedGames();