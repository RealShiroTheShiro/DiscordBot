const Discord = require('discord.js');
//const { MembershipStates } = require('discord.js/typings/enums');

const RebelAFKBot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"] });

const prefix = '+';

counting = false;
counter = 0;

RebelAFKBot.once('ready', () => {
    //RebelAFKBot.channels.cache.get('967085683799896134').send('IM ALIVE!!!');
    if(RebelAFKBot.users.cache.get("180066546473762817").presence === 'offline')
        RebelAFKBot.channels.cache.get('967159078243684405').send('I Entered the IF!');
    console.log('RebelGuyMissingCounter is alive!');
    RebelAFKBot.channels.cache.get('967159078243684405').send('status -' + RebelAFKBot.users.cache.get("180066546473762817").presence);
});


RebelAFKBot.on('messageCreate', (msg) => {
    // Send back a reply when the specific command has been written by a user.
    if(!msg.content.startsWith(prefix) || msg.author.bot)
    {
        if(msg.content.toLowerCase().includes('gay') || msg.content.toLowerCase().includes('bad') || msg.content.toLowerCase().includes('bozo') || msg.content.toLowerCase().includes('toxic')) 
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
            msg.channel.send('Rebel_guy has been missing for '+ Math.round(counter/24) + ' days and ' + counter%24 + ' hours!!');
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
  });



RebelAFKBot.login('');
