const {EmbedBuilder} = require("discord.js");

exports.currentPromotion = async function() {

    let promoOps = [['https://i.imgur.com/ei1wDfp.png', '[Join Our Server](https://discord.gg/8BdC9VfguF)'],['https://i.imgur.com/CS7qDTN.png', '[Get Access To Premium Features](https://discord.com/application-directory/1077139728538812416/store/1260839276069785653)'], ['https://i.imgur.com/WZxz4r5.png', '[Get Access To Premium Features](https://discord.com/application-directory/1077139728538812416/store/1260839276069785653)'], ['https://i.imgur.com/mmrwlJu.png', '[Vote On Top.gg](https://top.gg/bot/1077139728538812416/vote)']]

//Update
    const random = Math.floor(Math.random() * promoOps.length);
    return  new EmbedBuilder()
        .setDescription(promoOps[random][1])
        .setColor('#2B2D31')
        .setImage(promoOps[random][0])
        .setFooter({text: "Servers that support us don't see these promotions."});

}