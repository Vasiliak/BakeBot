import {MessageActionRow, MessageButton, MessageEmbed} from 'discord.js'

async function ViewGameAchievements(id, search) {
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
    const {total_achieved, total_achievements, ListAchievements} = await SteamGameAchievements(id, search)

    /**
     * Creates an embed with games starting from an index.
     * @param {number} start The index to start from.
     * @returns {Promise<MessageEmbed>}
     */
    const generateEmbed = async start => {
    const current = ListAchievements.slice(start, start + 10)

    return new MessageEmbed({
        title: (`Achievements completed in ${search}:`, total_achieved + '/' + total_achievements),
        fields: [
            { name: ListAchievements[start][0], value: `Achieved: ${ListAchievements[start][1]}` }
        ]
    })
    }

    // Send the embed with the first 10 games
    const canFitOnOnePage = ListAchievements.length <= 10
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
                ...(currentIndex + 10 < ListAchievements.length ? [forwardButton] : [])
                ]
            })
            ]
        })
    });
}

ViewGameAchievements();