const {AttachmentBuilder, EmbedBuilder} = require("discord.js");

exports.colorEmbed =  async function(interaction, color, title, description, ...fields) {
        const Colors = {green: 'https://i.imgur.com/15NrgNg.png', blue: 'https://i.imgur.com/p3hx4pz.png', orange: 'https://i.imgur.com/xCQPxlw.png', red: 'https://i.imgur.com/99UT6LA.png'}
        let selectedColor;
        if(!Colors[color.toLowerCase()]){
            selectedColor = color
        }else{
            selectedColor  = Colors[color.toLowerCase()]
        }
        const embedColor =  new EmbedBuilder()
            .setColor('2B2D31')
            .setDescription(description)
            .setImage(selectedColor)
            .setTitle(title)
            .addFields(...fields)
            .setAuthor({
                name: `${interaction.guild.name} Economy System`, iconURL: interaction.guild.iconURL(),
            })

        return [embedColor]

}