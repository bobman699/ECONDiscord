const {SlashCommandBuilder, EntitlementManager, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');
const {EntanglementDrive} = require("../dataCrusher/Headquarters");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {

        await interaction.reply({content:`Pong!`});
    },
};