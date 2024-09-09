const {
    Interaction, EmbedBuilder, SlashCommandBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle
} = require("discord.js");
const { ErrorEmbed } = require("../utils/embedUtil");
const { UserHQ, GuildHQ } = require("../dataCrusher/Headquarters");
const { paginateUtil } = require("../utils/paginateUtil");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('View your inventory or someone else.')
        .addSubcommand(subCmd => 
            subCmd.setName("view")
                .setDescription("View yours or another persons invetory.")
                .addUserOption((option) =>
                    option.setName("user")
                        .setDescription("The user that you would like to view the inventory of.")
                        .setRequired(false)
                )
        )
        .addSubcommand(subCmd =>
            subCmd.setName("deplete")
                .setDescription("Use up the items in your inventory.")
                .addStringOption(stringOp =>
                    stringOp.setName("item")
                        .setDescription("The item would like to deplete.")
                        .setAutocomplete(true)
                        .setRequired(true)
                )
                .addNumberOption(numOp =>
                    numOp.setName("amount")
                    .setDescription("The amount of items youd like to deplete.")
                    .setRequired(false)
                )
        ),
    async autocomplete(interaction) {
        if (process.env.status === 'DEV') {
            await activeBusiness.set(`${interaction.IDENT}-${interaction.user.id}`, 'c67bde70-7bcc-438b-8529-209325770cdd')
        }
        const activeUSER = await new UserHQ(interaction, interaction.user.id);
       
        const USER = new UserHQ(interaction, interaction.user.id)
        const MoneyFormat = new Intl.NumberFormat('en-us')
        const focusedOption = interaction.options.getFocused(true);

        switch (focusedOption.name) {
            case "item": {
                const choices = await USER.getInventory(true);
                const filtered = choices.filter(async choice => {
                    return choice.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())
                });
                await interaction.respond(
                    filtered.map(choice => {
                        if (String(choice.name).length > 25) {
                            choice.name = String(choice.name).substring(0, 25);
                        }
                        return ({ name: `${choice.name} | x${choice.quantity}`, value: choice.IDENT })

                    }).slice(0, 20)

                );
            }
                break
        }
    },
    async execute(interaction) {
        if (!interaction.guild) {
            return await ErrorEmbed(interaction, "This can only be used in a server!");
        }

        await interaction.deferReply();

        const guildManager = new GuildHQ(interaction);
        const member = interaction.options.getMember('user') || interaction.member;
        const User = new UserHQ(interaction, member.id);
        const Inventory = await User.getInventory();
        const PagainatedInventory = await paginateUtil(Inventory, 10)

        switch (interaction.options.getSubcommand()) {
            case "view": {
                let currentPage = 1;
                const row = new ActionRowBuilder();
                const backButt = new ButtonBuilder()
                    .setCustomId("back")
                    .setLabel("<--")
                    .setStyle(ButtonStyle.Primary);
                const nextButt = new ButtonBuilder()
                    .setCustomId("next")
                    .setLabel("-->")
                    .setStyle(ButtonStyle.Primary);
                row.addComponents(nextButt);

                const InventoryValue = await User.getInventoryValue()
                const InventoryEmebed = new EmbedBuilder()
                    .setTitle(`${member.displayName}'s Inventory`)
                    .setColor(Colors.Blurple)
                    .setFooter({
                        text: `Page 1/${Object.keys(PagainatedInventory).length} • Inventory is valued at ${await guildManager.formatMoney(InventoryValue)}`,
                        iconURL: interaction.guild.iconURL(),
                    });
                let items = [];
                for (let [key, value] of PagainatedInventory[currentPage]) {
                    const item = await User.getInventoryItem(value.item);
                    if (item.deletedAt !== null) {
                        items.push(`**${item.name}** [Discontinued] • x${value.quantity}`);
                        continue
                    }
                    items.push(`**${item.name}** • x${value.quantity}`);
                }
                if (items.length === 0) {
                    InventoryEmebed.setDescription("This user doesn't own any items.")
                } else {
                    InventoryEmebed.setDescription(items.join('\r\n'));
                }
                currentPage === Object.keys(PagainatedInventory).length ? (
                    interaction.editReply({ embeds: [InventoryEmebed] })
                ) : (
                    interaction.editReply({ embeds: [InventoryEmebed], components: [row] })
                )

                const buttonFilter = (i) =>
                    (i.customId === "back" ||
                        i.customId === "next") &&
                    i.user.id === interaction.user.id;
                const buttonCollector = interaction.channel.createMessageComponentCollector(
                    { buttonFilter, time: 120000 }
                )

                buttonCollector.on("collect", async (i) => {
                    if (
                        (i.customId === "back" || i.customId === "next") &&
                        i.user.id === interaction.user.id
                    ) {
                        const row = new ActionRowBuilder();
                        row.addComponents(backButt, nextButt)
                        items = []
                        if (i.customId === "back") {
                            const ROW = new ActionRowBuilder();
                            ROW.addComponents(nextButt)
                            currentPage--
                            InventoryEmebed.setFooter({
                                text: `Page ${currentPage}/${Object.keys(PagainatedInventory).length} • Inventory is valued at ${await guildManager.formatMoney(InventoryValue)}`,
                                iconURL: interaction.guild.iconURL(),
                            });
                            for (let [key, value] of PagainatedInventory[currentPage]) {
                                const item = await User.getInventoryItem(value.item);
                                items.push(`**${item.name}** • x${value.quantity}`);
                            }
                            InventoryEmebed.setDescription(items.join('\r\n'));
                            interaction.editReply({ embeds: [InventoryEmebed], components: [(currentPage === 1 ? ROW : row)] })
                            return;
                        }
                        if (i.customId === "next") {
                            const ROW = new ActionRowBuilder();
                            ROW.addComponents(backButt)
                            currentPage++
                            InventoryEmebed.setFooter({
                                text: `Page ${currentPage}/${Object.keys(PagainatedInventory).length} • Inventory is valued at ${await guildManager.formatMoney(InventoryValue)}`,
                                iconURL: interaction.guild.iconURL(),
                            });
                            for (let [key, value] of PagainatedInventory[currentPage]) {
                                const item = await User.getInventoryItem(value.item);
                                items.push(`**${item.name}** • x${value.quantity}`);
                            }
                            InventoryEmebed.setDescription(items.join('\r\n'));
                            interaction.editReply({
                                embeds: [InventoryEmebed],
                                components: [(currentPage === Object.keys(PagainatedInventory).length ? ROW : row)]
                            })
                        }
                    }
                })
            }break;


            case "deplete": {
                const USER = new UserHQ(interaction, interaction.user.id);
                const itemInput = interaction.options.getString("item");
                let amountInput = interaction.options.getNumber("amount") || 1;
                const inventoryItem = await USER.getItemInv(itemInput);
                const item = await USER.getInventoryItem(inventoryItem.item);
                
                if(inventoryItem.quantity < amountInput){
                    amountInput = inventoryItem.quantity;
                }

               try{

                    await USER.depleteItem(itemInput, amountInput, inventoryItem)

                }catch(err){
                    return await ErrorEmbed(interaction, err.message, false, false)
               }

                const successEmbed = new EmbedBuilder()
                .setDescription(`You've depleted x${amountInput} **${item.name}**.`)
                .setColor("Green");

                await interaction.editReply({embeds: [successEmbed]});


            }break


        }
    },
};