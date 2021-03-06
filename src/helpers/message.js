const config = require("../../config/config.json");

module.exports = {
    message: (client, message) => {
        if (message.author.bot || message.channel.nsfw) {
            return;
        }

        console.log(message.attachments);
        console.log(message.content);

        let isNSFW = message.attachments.size && message.attachments.first().filename.includes('.webm');
        let attachmentUrl = isNSFW ? message.attachments.first().proxyURL : message.content;

        config["nsfw-phrases"].forEach(phrase => {
            if (!isNSFW && message.content.includes(phrase) && (message.content.includes('https://') || message.content.includes('http://'))) {
                isNSFW = true;
            }
        });

        if (isNSFW) {
            message.delete().catch(o_o => {});

            let nsfwChannel = message.guild.channels.get(config['nsfw-channel']);

            if (nsfwChannel) {
                nsfwChannel.send({
                    file: attachmentUrl
                }).catch(o_O => {});
            }

            message.author.send({
                embed: {
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    color: 0xff8c00,
                    description: `Please remember to send your webm's or 4chan links to <#${config['nsfw-channel']}>.`
                }
            });
        }
    }
};
