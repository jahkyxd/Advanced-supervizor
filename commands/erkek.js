const Discord = require("discord.js");
const db = require("quick.db");
const jahky = require("../jahky.json");
module.exports = {
    name: 'erkek',
    aliases: ["e", "boy", "man"],
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed().setFooter("Developed By Jahky").setAuthor(message.author.username, message.author.avatarURL()).setTimestamp().setColor("00f1ff");
        var member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        var name = args[1]
        var age = args[2]
        var veri = args[3]
        if (![jahky.staff].some(jahkyy => message.member.roles.cache.has(jahkyy)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Ne yazık ki komutu kullanan kişide yetki yok"));
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."));
        if (!name) return message.channel.send(embed.setDescription("Lütfen kullanıcı için bir isim belirt."));
        if (!age) return message.channel.send(embed.setDescription("Lütfen kullanıcı için bir yaş belirt."));
        if (isNaN(age)) return message.channel.send(embed.setDescription("Lütfen belirttiğin yaş sayı olsun."))
        if (veri) return message.channel.send(embed.setDescription("Lütfen kullanıcı için isim ve yaş dışında bir veri belirtme."));
        if (db.fetch(`taglıalıms.${message.guild.id}`)) {
            if (![jahky.tag].some(jahkyxd => member.user.username.toLowerCase().includes(jahkyxd)) && !message.guild.members.cache.get(member.id).roles.cache.has(jahky.vip && jahky.boosterrol)) {
                return message.channel.send(embed.setDescription(`Kullanıcının kayıt olabilmesi için boost basmalı veya tag almalı! (${jahky.tag})`))
            };
        };
        message.guild.members.cache.get(member.id).setNickname(`${jahky.tag} ${name} | ${age}`);
        db.push(`isimler_${member.id}`, ` \`${name} ' ${age}\` Erkek Olarak ${message.author} tarafından`);
        await message.guild.members.cache.get(member.id).roles.add(jahky.manroles);
        await message.guild.members.cache.get(member.id).roles.remove(jahky.unregrol)
        message.channel.send(embed.setDescription(`${member} Adlı kullanıcı \`${name} ' ${age}\` olarak kayıt edildi`));
        client.channels.cache.get(jahky.chat).send(embed.setDescription(`${member} Aramıza katıldı, ona **merhaba** diyelim`));
    }
}