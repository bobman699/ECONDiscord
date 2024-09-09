const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { embedAction } = require('../utils/embedActionUtil');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Guides you through the basics of ECON, setting up a basic economy.'),
    async execute(interaction) {
        await interaction.deferReply();
        const intro = await embedAction(interaction, "ECON Setup Guide | Intro ", 
            `
            Thank you for choosing ECON. At first, ECON can seem complex, and truth be told; it is complex, but once you have an understanding of the basics, it's easy to navigate through.
            
            ECON is seperated into four entities, with each of them having their own features and uses:\n
            - Treasury [The server, all money starts out here. This also controls a lot of the server-wide settings.]\n
            - Departments [This entity has the ability to issue fines and fees; the revenue of them being returned to the treasury, so that it can be recirculated. Employees are managed through roles.]\n
            - Businesses [This entity can sell items to users, and keep it's revenue. Employees are individually managed]\n
            - Users [Oone way or another interacts with the other entities. Note that all members must register to use ECON commands. Registering set's up their wallets and awards them their starting balance.]\n
         
            Throughout the next few sections, will go over some basic commands for setting them up.
            `, "Next Section -> Setup Treasury")

        if(!intro[0]){
            return;
        }

        await intro[0].deferUpdate();

        const treasury = await embedAction(intro[0], "Econ Setup Guide | Treasury", 
            `
            As mentioned, the Treasury controls a lot of the settings for ECON and really acts on beahlf of the server. The first thing you need to note, is that all server admins have access to the treasury and bypass all permission checks.
            Additionally, you can grant non-admins full access to ECON and the treasury by </authorize add:1077339152774860953> them.
            *You see how that \`\`/authorize add\`\` command was tagged above? You're able to click on those command tags to load them, so that you can execute them quickily.*

            **Starting You're Economy**
            First, every economy needs money to start out with. Decide on how much money you want your server to start out with, keep in mind this will go towards serveral things.
            Once you decided on a number, run the </treasury print-money:1077339153194303535> command. That takes one input, which is the amount you would like to print. The Treasury now has money to fund things.
            
            **Starting Balance**
            ECON gives you the option to award users with a certain amount of money to start off with, this alloted money is awarded when they run the register command.
            To set the starting balance, run the </treasury set-starting-balance:1077339153194303535>. It has one input, the amount you want users to start off with.

            **Stipends**
            ECON gives the option to allow members to claim a certain amount of money periodically. This is similar to the /work commands that other bots have.
            To set up stipends, run the </treasury set-stipend:1077339153194303535> command. Note that this command has two inputs, the amount of which members can claim, and the timeout period in hours.
            
            **Budget timeout**
            Similar to stipends, Departments may claim an allotted budget, periodically. While each departments has their own budget, they all share the same timeout length.
            You can comeback to this later, otherwise to set the timeout length, run the </treasury set-budget-timout:1077339153194303535> command. The timeout length is in hours.
            `
            , "Next Section -> Setup Departments");

            if(!treasury[0]){
                return;
            }

            await treasury[0].deferUpdate();

            const departments = await embedAction(treasury[0], "Econ Setup Guide | Departments", 
                `
                Departments support the treasury in some ways. The revenue from the fines and fees issued by the department go back to the Treasury. Department permissions are all role-bind controlled.
                
                If you haven't already, take a minute to think about your department, and make sure it has all the roles setup. There should be a head role and a general department role that all members have, along with ranks/permissions.

                **Creating A New Department**
                To create a new department, run the </treasury add-department:1077339153194303535> command. It requires three inputs, the name, the head-role (which has all perms within the department), and department role. It also has other optional inputs, such as the budget it is allowed to claim, the max-budget (which caps a department's balance/funding.) and a description.

                **Telling ECON which Entity You're Interacting With**
                Do note that whenever you're interacting with/using a department (or business) you need tell ECON which entity is you are wanting to manipulate. To do this, run the </set department:1077339153194303533> command, it takes one input, the entity you're wanting to set. Make sure to select from the autocomplete. This tells ECON the exact department you are working with.

                **Add Role-Binds**
                As mentioned, departments manage employees and permissions through roles. To bind a role with a department and it's permissions, run the </dep add-role-bind:1077339152774860957> command. It initially just ask for the role you are wanting to bind. After you execute the command, you will be prompted to select the permissions you wish to grant this role with.

                **Employees**
                Employees are those with the department roles, and have access to the permissions that their deparment roles are binded with.

                `
                , "Next Section -> Setup Businesses");
    
                if(!departments[0]){
                    return;
                }
    
                await departments[0].deferUpdate();

                const businesses = await embedAction(departments[0], "Econ Setup Guide | Businesses", 
                    `
                    Businesses are entities that can sell items to users, they keep their revenue, they manage employees individually and are managed and owned by a user. Again, if you haven't already, mke sure to take a moment to think about your business.

                    **Adding A Business**
                    To create a new business, run the </treasury add-business:1077339153194303535> command. It takes a name, a description and OWNER (user, who has all permissions for the business).

                    **Adding Employees**
                    With businesses, employees are individually managed; To add an employee, [make sure to </set business:1077339153194303533>] run the </bus staff add-employee:1077339152774860955> command. It initially ask for the user you whish to hire, then after executing the command, it'll prompt to select all the permissions you want this employee to have.

                    **Adding Items**
                    To add an item to be sold from the business, run the command </bus pos add-item:1077339152774860955>. It'll take a name, description, price and own-muitple (if a user can own more than one of this item). With premium, items can be marked as \`\`quick-access\`\` which allows employeess to sell mutiple items in one transaction, at once.

                    **Selling Items**
                    To sell and item, run the </bus sell sell-item:1077339152774860955>. That takes a user (that you are selling to, must have DMs open), and the item (which you MUST select from the AUTOCOMPLETE). The user you are selling to will be DMed by ECON and promoted to select a payment method.
                    
                    `
                    , "Next Section -> General Information");
        
                    if(!businesses[0]){
                        return;
                    }

                    await businesses[0].deferUpdate();

                    const finalEmbed = new EmbedBuilder()
                    .setTitle("ECON Setup Guide | General Information")
                    .setColor("Green")
                    .setDescription(`
                        You've now setup a basic economy. ECON has so much more features that you'll need to discover on you own, such as shifts, payroll, etc. Luckily for you, a lot of the cool features are separated out to their own command.

                        **For The General Members**
                        - Ensure they run the </register:1077339153194303531> command.\n
                        - ECON __REQUIRES__ users to have their DMs enabled for some features.\n
                        - They may collect their stipend by running the command </stipend:1077339153194303534>.\n
                        - Use the </atm:1077339152774860952> to withdraw, deposit, or view your account. You have a wallet and bank, some transctions use only the wallet.\n
                        - They may view all their owned items by running the </inventory view:1077339152774860959> command.


                        **Premium Features**
                        Buy being a Premium subscriber, you not only support the continuation of ECON, but also gain access to many features.
                        - Tax Feature\n
                        - Extended inflate options\n
                        - No Promotional ADs.\n
                        - Quick-Access, sell many items at once.\n
                        - Custom Currency\n
                        - Extended Statistics\n
                        `)
        
                    await businesses[0].editReply({content: " ", components: [], embeds:[finalEmbed]});
    },
};