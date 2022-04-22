const Discord = require('discord.js');

const RebelAFKBot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = '+';

counting = false;
counter = 0;

RebelAFKBot.once('ready', () => {
    //RebelAFKBot.channels.cache.get('967085683799896134').send('IM ALIVE!!!');
    console.log('RebelGuyMissingCounter is alive!');
});


RebelAFKBot.on('messageCreate', (msg) => {
    // Send back a reply when the specific command has been written by a user.
    if(!msg.content.startsWith(prefix) || msg.author.bot)
    {
        if(msg.content.toLowerCase().includes('rebel_gay')) 
        {
            msg.reply('no you');
        }
        return;
    }

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
            msg.channel.send('Im currently counting.');
    }

    else if(command === 'start')
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
            if(counter === 1)
                msg.channel.send('Rebel has been missing for '+ counter + ' day!!');
            else
            msg.channel.send('Rebel has been missing for '+ counter + ' days!!');
        }, 8640000);

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
  });



RebelAFKBot.login('OTY3MTU5MzIzODk5ODY3MjM2.YmMPTw.BFiPrUazox39ivc-m39UefF_BPM');
