const { MessageEmbed } = require("discord.js");
const jahky = require("../jahky.json");
const db = require("quick.db");
module.exports = {
    name: "taglı",
    aliases: [],
    run: async (client, message, args) => {
        var embed = new MessageEmbed().setFooter("Developed By Jahky").setAuthor(message.author.username, message.author.avatarURL()).setTimestamp().setColor("00f1ff")
        if (message.author.id !== message.guild.owner.user.id && message.author.id !== jahky.sahip.id) return message.channel.send(embed.setDescription(`Ne yazık ki komutu kullanan kişide yetki yok`))
        var ceki = args[0];

        if (!ceki) return message.channel.send(embed.setDescription("Lütfen bir veri belirtiniz. Örnek kullanım : ``.taglı aç/kapat``"))

        if (ceki === "aç") {
            if (db.fetch(`taglıalıms.${message.guild.id}`))
                db.set(`taglıalıms.${message.guild.id}`, "taglıalıms")
            message.channel.send(embed.setDescription(`Taglı alım açıldı!`))
        }

        if (ceki === "kapat") {
            if (!db.fetch(`taglıalıms.${message.guild.id}`))
                db.delete(`taglıalıms.${message.guild.id}`)
            message.channel.send(embed.setDescription(`Taglı alım kapatıldı!`))
        }
    }
}