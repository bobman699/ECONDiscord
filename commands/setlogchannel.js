const {SlashCommandBuilder, AttachmentBuilder, EmbedBuilder} = require('discord.js');
const {colorEmbed} = require("../customPackage/colorBar");
const {ErrorEmbed} = require("../utils/embedUtil");
const {BusinessHQ, UserHQ, PermManager, DepartmentHQ, GuildHQ} = require("../dataCrusher/Headquarters");
const {activeBusiness, activeDepartment} = require("../dataCrusher/services/cache");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlogchannel')
        .setDescription('Use to set the logging channels for a business, department or treasury/server.')
        .addStringOption(stringop => stringop.setName('type')
            .setDescription('Set general or activity logging channel?')
            .setChoices({value: 'general', name: 'General'}, {value: 'activity', name: 'Activity'})
            .setRequired(true))
        .addStringOption(stringop => stringop.setName('entity')
            .setDescription('Which entity would you like to set a logging channel for? (Department, Business or Treasury)')
            .setChoices({value: 'department', name: 'Department'}, {value: 'business', name: 'Business'}, {value: 'treasury', name: "Treasury/Server"})
            .setRequired(true))
        .addChannelOption(channelop => channelop.setName('channel')
            .setDescription('The channel you would like to set as the logging channel. Leave blank to remove logging channel.')),
    async execute(interaction) {
        await interaction.deferReply()

        const type = interaction.options.getString('type');
        const entity = interaction.options.getString('entity');
        const channel = interaction.options.getChannel('channel');

        const statusEmbed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`\\🟢 Updated the ${type} logging channel for \`\`${entity}\`\` to <#${channel.id}>.`)

        switch(entity){
            case 'business': {
                const activeUSER = await new UserHQ(interaction, interaction.user.id);
                if (await activeUSER.getBusiness() == null) {
                    return await ErrorEmbed(interaction, 'Error, please set a business first using the set command.')
                }

                const business = new BusinessHQ(interaction, (await activeBusiness.get(`${interaction.IDENT}-${interaction.user.id}`)));

                if (await PermManager.Business.checkPerm(business, interaction, "admin") === false) {
                    return await ErrorEmbed(interaction, "Insufficient perms. Admin permission level required.")
                }

                switch(type){
                    case 'general': {

                        try{
                            await business.setGeneralLog(channel)
                            await interaction.editReply({embeds: [statusEmbed]})
                            return
                        }catch(err){
                            console.log(err)
                            return await ErrorEmbed(interaction, err.message)
                        }
                        break}

                    case 'activity': {
                        try{
                            await business.setActivityLog(channel)
                            await interaction.editReply({embeds: [statusEmbed]})
                            return
                        }catch(err){
                            console.log(err)
                            return await ErrorEmbed(interaction, err.message)
                        }

                        break}
                }

                return await ErrorEmbed(interaction, 'You must select type General or Activity.')

                break}

            case 'department': {
                const activeUSER = await new UserHQ(interaction, interaction.user.id);
                if (await activeUSER.getDepartment() == null) {
                    return await ErrorEmbed(interaction, 'Error, please set a department first using the set command.')
                }

                const department = await new DepartmentHQ(interaction, (await activeDepartment.get(`${interaction.IDENT}-${interaction.user.id}`)));

                if (await PermManager.Department.checkPerm(interaction, department, "Department-Management") === false) {
                    return await ErrorEmbed(interaction, "Insufficient perms. Department-Management permission level required.")
                }

                switch(type){
                    case 'general': {

                        try{
                            await department.setGeneralLog(channel)
                            await interaction.editReply({embeds: [statusEmbed]})
                            return
                        }catch(err){
                            console.log(err)
                            return await ErrorEmbed(interaction, err.message)
                        }
                        break}

                    case 'activity': {
                        try{
                            await department.setActivityLog(channel)
                            await interaction.editReply({embeds: [statusEmbed]})
                            return
                        }catch(err){
                            console.log(err)
                            return await ErrorEmbed(interaction, err.message)
                        }

                        break}
                }

                return await ErrorEmbed(interaction, 'You must select type General or Activity.')
                break}

            case 'treasury': {

                const activeUSER = await new UserHQ(interaction, interaction.user.id);


                const guild = new GuildHQ(interaction);

                if (await PermManager.Treasury.checkAuthorization(interaction, interaction.user) === false) {
                    return await ErrorEmbed(interaction, "UNAUTHORIZED. YOU ARE NOT AUTHORIZED TO MANAGE TREASURY SETTINGS.")
                }

                switch(type){
                    case 'general': {

                        try{
                            await guild.setGeneralLog(channel)
                            await interaction.editReply({embeds: [statusEmbed]})
                            return
                        }catch(err){
                            console.log(err)
                            return await ErrorEmbed(interaction, err.message)
                        }
                        break}

                    case 'activity': {
                        try{
                            await guild.setActivityLog(channel)
                            await interaction.editReply({embeds: [statusEmbed]})
                            return
                        }catch(err){
                            console.log(err)
                            return await ErrorEmbed(interaction, err.message)
                        }

                        break}
                }

                return await ErrorEmbed(interaction, 'You must select type General or Activity.')
                break}
        }

        return await ErrorEmbed(interaction, 'You must select entity Business, Department, or Treasury/Server.')

    },
};