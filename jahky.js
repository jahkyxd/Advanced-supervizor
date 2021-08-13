const Discord = require("discord.js");
const client = new Discord.Client();
const jahky = require("./jahky.json");
const fs = require("fs");
const moment = require('moment')
require('moment-duration-format')
client.on("ready", () => {
    client.user.setPresence({ activity: { name: "Developed By Jahky" }, status: "dnd" });
    client.channels.cache.get("").join();//ses kanal
    console.log(`${client.user.username} Olarak Giriş Yapıldı Bot Aktif Developed By jahky`);
})
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();
fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})
client.on('message', message => {
    if (!message.guild || message.author.bot || !message.content.startsWith(jahky.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})


client.on('guildMemberAdd', (member) => {
    if (member.user.bot) return;
    member.setNickname(jahky.otoisim);
    member.roles.add(jahky.unregrol);
    var kurulus = (Date.now() - member.user.createdTimestamp);
    var zaman = moment.duration(kurulus).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün], HH [saat], mm [dakika], ss [saniye]");
    var zaman2 = moment.duration(kurulus).format("DD [Gün], HH [saat], mm [dakika], ss [saniye]");
    if (kurulus > 604800000) {
    client.channels.cache.get(jahky.hoşgeldinkanal).send(`Suncumuza hoşgeldin ${member}

    Seninle birlikte **\`${member.guild.memberCount}\`** üyeye ulaştık

    Sunucumuza kayıt olmak istiyorsan yandaki \`V.CONFİRMED\` odalarına geçebilir 
    
    Tag alarak bizi destekleyebilirsin

    Tagımıza ulaşmak istiyorsan \`.tag\` komudunu kullanabilirsin

    Hesabın **\`${zaman}\`** önce açılmış <@&${jahky.staff}>
`);
    } else {
        member.setNickname(jahky.suspeciosisim);
        client.channels.cache.get(jahky.hoşgeldinkanal).send(
            new Discord.MessageEmbed()
                .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
                .setColor("RANDOM")
                .setDescription(`${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı \`**${zaman2}**\` Önce Açıldığı İçin Şüpheli!`)
                .setFooter(`Developed By jahky`)
                .setTimestamp());
    }
});

client.login(jahky.token).then(x => console.log(`${client.user.username} olark giriş yapıldı`)).catch(err => console.log(`Bot giriş yaparken bir sıkıntı çıktı. sebeb: ${err}`))

client.on('message', message => {
    if (message.content === 'tag') {
        message.channel.send(`\`${jahky.tag}\``);
    } 
    
    if (message.content === '.tag') {
        message.channel.send(`\`${jahky.tag}\``);
    }
});

client.on("userUpdate", async function(oldUser, newUser) {
    const guildID = jahky.guildıd
    const roleID = jahky.tagrol
    const tag = jahky.tag
    const chat = jahky.chat
    const log2 = jahky.taglog
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setTimestamp().setFooter('Developed By jahky');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`jahky\` çıkartarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(` Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.`)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} ismine \`jahky\` alarak ailemize katıldı`))
        }
    }
})
