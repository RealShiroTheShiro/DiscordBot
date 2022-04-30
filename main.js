const Discord = require('discord.js');

const RebelAFKBot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"] });
const RebelID = '180899128006410240';
const ServerID = '851740488674836520';

const prefix = '+';

counting = false;
counter = 0;

RebelAFKBot.once('ready', () => {
    console.log('RebelGuyMissingCounter is alive!');
    if(typeof RebelAFKBot.guilds.cache.get(ServerID).members.cache.get(RebelID).presence?.status != 'undefined')
        console.log('Rebel_guy is ' + RebelAFKBot.guilds.cache.get(ServerID).members.cache.get(RebelID).presence?.status);
    else
    {
        console.log('Rebel_guy is offline.');
        counting = true;
        setInterval(() => {
            counter++;
            if(counter%24 === 1)
                if(Math.round(counter/24) === 1)
                    msg.channel.send('Rebel has been missing for 1 day and 1 hour!!');
                else
                    msg.channel.send('Rebel has been missing for '+ Math.round(counter/24) + ' days and 1 hour!!');
            else if(Math.round(counter/24) === 1)
                msg.channel.send('Rebel has been missing for 1 day and '+ counter%24 + ' hours!!');
            else
                msg.channel.send('Rebel has been missing for '+ Math.round(counter/24) + ' days and ' + counter%24 + ' hours!!');
        }, 3600000);
    }
});

RebelAFKBot.on('presenceUpdate', (oldPresence, newPresence) => {
    let member = newPresence.member;
    if (member.id === RebelID) {
        if (oldPresence.status !== newPresence.status) {
            let channel = member.guild.channels.cache.get('945301031347163147');

            let text = "";

            if (newPresence.status === "online") {
                counting = false;
                counter = 0;
                text = "Rebel just went online!";
            } else if (newPresence.status === "offline") {
                counting = true;
                text = "Rebel is offline again...";
                channel.send("I hope to not see it");
                setInterval(() => {
                    counter++;
                    if(counter%24 === 1)
                        if(Math.round(counter/24) === 1)
                            msg.channel.send('Rebel has been missing for 1 day and 1 hour!!');
                        else
                            msg.channel.send('Rebel has been missing for '+ Math.round(counter/24) + ' days and 1 hour!!');
                    else if(Math.round(counter/24) === 1)
                        msg.channel.send('Rebel has been missing for 1 day and '+ counter%24 + ' hours!!');
                    else
                        msg.channel.send('Rebel has been missing for '+ Math.round(counter/24) + ' days and ' + counter%24 + ' hours!!');
                }, 3600000);        
            }

            channel.send(text);
        }
    }
});


RebelAFKBot.on('messageCreate', (msg) => {
    // Send back a reply when the specific command has been written by a user.
/*    if(!msg.content.startsWith(prefix) || msg.author.bot)
    {
        if(msg.content.toLowerCase().includes('gay') || msg.content.toLowerCase().includes('bad') || msg.content.toLowerCase().includes('bozo') || msg.content.toLowerCase().includes('toxic')) 
        {
            msg.reply('no you');
        }
        return;
    }*/

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping')
    {
        msg.channel.send('pong');
    }
    else if(command === 'status')
    {
        if(counting === false)
            msg.channel.send('Im not currently counting.');
        else
            msg.channel.send('Rebel_guy has been missing for '+ Math.round(counter/24) + ' days and ' + counter%24 + ' hours!!');
    }

 /*   else if(command === 'start')
    {
        if(counting === true)
        {
            msg.channel.send('Im already counting!');
            return;
        }
        msg.channel.send('Starting to count!');
        counting = true;
        setInterval(() => {
            counter++;
            if(counter%24 === 1)
                if(Math.round(counter/24) === 1)
                    msg.channel.send('Rebel has been missing for 1 day and 1 hour!!');
                else
                    msg.channel.send('Rebel has been missing for '+ Math.round(counter/24) + ' days and 1 hour!!');
            else if(Math.round(counter/24) === 1)
                msg.channel.send('Rebel has been missing for 1 day and '+ counter%24 + ' hours!!');
            else
                msg.channel.send('Rebel has been missing for '+ Math.round(counter/24) + ' days and ' + counter%24 + ' hours!!');
        }, 3600000);

    }
    else if(command === 'stop')
    {
        if(counting === false)
        {
            msg.channel.send('Sir, Im not currently counting!');
            return;
        }
        msg.channel.send('Stopped counting :(');
        counting = false;
    }
    else if(command === 'reset')
    {
        if(counting === true)
        {
            msg.channel.send('Sir, Im currently counting!');
            return;
        }
        msg.channel.send('Reseting counter!');
        counter = 0;
    }
    */
  });



RebelAFKBot.login('');
