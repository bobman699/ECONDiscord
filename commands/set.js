const {RetrieveData, CreateData, UpdateData} = require("../dataCrusher/Headquarters.js");
const {activeBusiness, activeDepartment} = require("../dataCrusher/Headquarters").CacheManager;
const {ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder, ComponentType, EmbedBuilder} = require("discord.js");
const {UserHQ, BusinessHQ, DepartmentHQ, GuildHQ} = require("../dataCrusher/Headquarters");
const {currentPromotion} = require("../utils/PromotionUtil");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Select the business, department, or account to manage.")
        .addSubcommand(subcommand => subcommand.setName('business').setDescription('Choose the business you wish to actively manage.')
            .addStringOption(option=>
                option.setName('business').setDescription('The business you wish to set.').setRequired(true).setAutocomplete(true))
            // .addBooleanOption(option=>
            //     option.setName('default').setDescription('Set this business as the default?').setRequired(false))
        )
        .addSubcommand(subcommand => subcommand.setName('department').setDescription('Choose the department you wish to actively manage.')
            .addStringOption(option=>
            option.setName('department').setDescription('The department you wish to set.').setRequired(true).setAutocomplete(true))
            // .addBooleanOption(option=>
            // option.setName('default').setDescription('Set this department as the default?').setRequired(false)
            // )
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
        const promoEmbed = await currentPromotion(ispremium);

        const USER = await new UserHQ(interaction, interaction.user.id)
        const successEmebed = new EmbedBuilder()
            .setColor('Green')

        if (interaction.options.getSubcommand() === 'business') {
          const business = interaction.options.getString('business');
          const isDefault = false //interaction.options.getBoolean('default');
          const BUSINESS = await new BusinessHQ(interaction, business).getName();

            if(ispremium){
                await activeBusiness.set(`${interaction.IDENT}-${interaction.user.id}`,  business)
                successEmebed.setTitle(`\\✅ Successfully changed your business to \`\`${BUSINESS}\`\`.`)
                return interaction.editReply({embeds: [successEmebed]})
            }

            await activeBusiness.set(`${interaction.IDENT}-${interaction.user.id}`,  business)
            successEmebed.setTitle(`\\✅ Successfully changed your business to \`\`${BUSINESS}\`\`.`)

            return interaction.editReply({embeds: [successEmebed, promoEmbed]})
        }
        if (interaction.options.getSubcommand() === 'department') {

            const department = interaction.options.getString('department');
            const isDefault = false //interaction.options.getBoolean('default');
            const DEPARTMENT = await new DepartmentHQ(interaction, department).getName();

            if(ispremium){
                await activeDepartment.set(`${interaction.IDENT}-${interaction.user.id}`,  department)
                successEmebed.setTitle(`\\✅ Successfully changed your department to \`\`${DEPARTMENT}\`\`.`)
                return interaction.editReply({embeds: [successEmebed]})
            }

            await activeDepartment.set(`${interaction.IDENT}-${interaction.user.id}`,  department)
            successEmebed.setTitle(`\\✅ Successfully changed your department to \`\`${DEPARTMENT}\`\`.`)

            return interaction.editReply({embeds: [successEmebed, promoEmbed]})

        }
    }
}
