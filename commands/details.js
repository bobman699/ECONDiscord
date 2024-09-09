const {RetrieveData, CreateData, UpdateData} = require("../dataCrusher/Headquarters.js");
const {activeBusiness, activeDepartment} = require("../dataCrusher/Headquarters").CacheManager;
const {ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder, ComponentType, EmbedBuilder} = require("discord.js");
const {UserHQ, BusinessHQ, DepartmentHQ, GuildHQ} = require("../dataCrusher/Headquarters");
const {currentPromotion} = require("../utils/PromotionUtil");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("details")
        .setDescription("Get details of a business or department.")
        .addSubcommand(subcommand => subcommand.setName('business').setDescription('Choose the business.')
            .addStringOption(option=>
                option.setName('business').setDescription('The business you wish to see details of.').setRequired(true).setAutocomplete(true))
        )
        .addSubcommand(subcommand => subcommand.setName('department').setDescription('Choose the department.')
            .addStringOption(option=>
            option.setName('department').setDescription('The department you wish to see details of.').setRequired(true).setAutocomplete(true))
        ),

    async autocomplete(interaction){

        const focusedOption = interaction.options.getFocused(true);

        const Treasury = await RetrieveData.treasury(interaction.IDENT, false)

        switch(focusedOption.name){
            case 'department': {
                const choices = await Treasury.getDepartments({raw: true});
                if (choices.length === 0) {
                    return await interaction.respond([{
                        name: "Error, no departments exist in this economy.",
                        value: "Error"
                    }]);
                }
                const filtered = choices.filter(choice => {
                    return choice.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())
                });
                await interaction.respond(
                    filtered.map(choice => ({name: choice.name, value: choice.IDENT})),
                );
            }break
            case 'business': {
                const choices = await RetrieveData.accountsByType(interaction, 'business')
                if (choices.length === 0) {
                    return await interaction.respond([{
                        name: "Error, no businesses exist in this economy.",
                        value: "Error"
                    }]);
                }
                const filtered = choices.filter(choice => {
                    return choice.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())
                });
                await interaction.respond(
                    filtered.map(choice => ({name: choice.name, value: choice.IDENT})),
                );
            }break

        }
    },
    async execute(interaction) {
        if (!interaction.guild) {
            return interaction.reply("This can only be used in a server!");
        }

        await interaction.deferReply()
        const guildManager = new GuildHQ(interaction);
        const ispremium = await guildManager.getPremiumStatus();

        let detailsEmbed = new EmbedBuilder()
        .setColor("#fcff63")

        if (interaction.options.getSubcommand() === 'business') {
           const business = await new BusinessHQ(interaction, interaction.options.getString("business"));
           const busDetails = await business.getFullDetail();
           const busOwner = await RetrieveData.userByIDENT(busDetails.owner);
           const ownerDis = await interaction.guild.members.fetch(`${busOwner.id}`)
            
           detailsEmbed.setTitle(`Details of ${busDetails.name}`)
           .setDescription(`*${busDetails.description}*\n\n **Owner:** ${ownerDis}`);

           await interaction.editReply({embeds: [detailsEmbed]});
           return
        }
        if (interaction.options.getSubcommand() === 'department') {
            const department = await new DepartmentHQ(interaction, interaction.options.getString("department"));
            const depDetails = await department.getFullDetail();
            const headRole = depDetails.headRole;

            detailsEmbed.setTitle(`Details of ${depDetails.name}`)
           .setDescription(`*${depDetails.description}*\n\n **Head Role:** <@&${headRole}>`);

           await interaction.editReply({embeds: [detailsEmbed]});
           return
        }
    }
}
