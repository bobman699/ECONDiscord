const {Events} = require("discord.js")
module.exports = {
    name: Events.Error,
    once: false,
    execute(Err) {
        console.warn("ERROR. ERROR. ERROR.", Err.message);
    },
};