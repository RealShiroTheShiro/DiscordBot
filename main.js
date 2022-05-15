const Discord = require('discord.js');
var fs = require('fs');

const RebelAFKBot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"] });
const RebelID = '180066546473762817';
const ServerID = '851740488674836520';
const PostingChannel = '852106496236978236';
const ShiroID = '100775643465138176';

const prefix = '+';

counting = false;
counter = 397;

RebelAFKBot.once('ready', () => {
    console.log('RebelGuyMissingCounter is alive!');

    var data = fs.readFileSync('./config.json'), counter;

    try {
    counter = JSON.parse(data);
    console.dir(counter);
    }
    catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
    }


    if(typeof RebelAFKBot.guilds.cache.get(ServerID).members.cache.get(RebelID).presence?.status != 'undefined')
    {
        console.log('Rebel_guy is ' + RebelAFKBot.guilds.cache.get(ServerID).members.cache.get(RebelID).presence?.status);
        counter = 0;
    }
    else
    {
        console.log('Rebel_guy is offline.');
        counting = true;
        setInterval(() => {
            counter++;
            if(counter%24 === 1)
                if(Math.floor(counter/24) === 1)
                    RebelAFKBot.guilds.cache.get(ServerID).channels.cache.get(PostingChannel).send('Rebel has been missing for 1 day and 1 hour!!');
                else
                    RebelAFKBot.guilds.cache.get(ServerID).channels.cache.get(PostingChannel).send('Rebel has been missing for '+ Math.floor(counter/24) + ' days and 1 hour!!');
            else if(Math.floor(counter/24) === 1)
                RebelAFKBot.guilds.cache.get(ServerID).channels.cache.get(PostingChannel).send('Rebel has been missing for 1 day and '+ counter%24 + ' hours!!');
            else
                RebelAFKBot.guilds.cache.get(ServerID).channels.cache.get(PostingChannel).send('Rebel has been missing for '+ Math.floor(counter/24) + ' days and ' + counter%24 + ' hours!!');
        }, 3600000);
    }
});

RebelAFKBot.on('presenceUpdate', (oldPresence, newPresence) => {
    let member = newPresence.member;
    if (member.id === RebelID) {
        if (oldPresence.status !== newPresence.status) {
            let channel = member.guild.channels.cache.get(PostingChannel);

            let text = "";

            if (newPresence.status === "online") {
                counting = false;
                counter = 0;
                text = "Rebel just went online!";
            } else if (newPresence.status === "offline") {
                counting = true;
                text = "Rebel is offline again...";
                setInterval(() => {
                    counter++;
                    if(counter%24 === 1)
                        if(Math.floor(counter/24) === 1)
                            msg.channel.send('Rebel has been missing for 1 day and 1 hour!!');
                        else
                            msg.channel.send('Rebel has been missing for '+ Math.floor(counter/24) + ' days and 1 hour!!');
                    else if(Math.floor(counter/24) === 1)
                        msg.channel.send('Rebel has been missing for 1 day and '+ counter%24 + ' hours!!');
                    else
                        msg.channel.send('Rebel has been missing for '+ Math.floor(counter/24) + ' days and ' + counter%24 + ' hours!!');
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

    if(msg.content.startsWith(prefix) && command === 'ping')
    {
        msg.channel.send('pong');
    }
    else if(msg.content.startsWith(prefix) && command === 'status')
    {
        if(counting === false)
            msg.channel.send('Im not currently counting.');
        else
        {
            if(counter%24 === 1)
                if(Math.floor(counter/24) === 1)
                    msg.channel.send('Rebel has been missing for 1 day and 1 hour!!');
                else
                    msg.channel.send('Rebel has been missing for '+ Math.floor(counter/24) + ' days and 1 hour!!');
            else if(Math.floor(counter/24) === 1)
                msg.channel.send('Rebel has been missing for 1 day and '+ counter%24 + ' hours!!');
            else
                msg.channel.send('Rebel has been missing for '+ Math.floor(counter/24) + ' days and ' + counter%24 + ' hours!!');
        }
    }
    else if(msg.content.startsWith(prefix) && command === 'restart' && msg.author.id === ShiroID)
    {
        var data = JSON.stringify(counter);

        fs.writeFile('./config.json', data, function (err) {
            if (err) {
              console.log('There has been an error saving your configuration data.');
              console.log(err.message);
              return;
            }
            console.log('Configuration saved successfully.')
        });

        msg.channel.send('Restarting, BRB!');

        setTimeout(function () {
            process.on("exit", function () {
                require("child_process").spawn(process.argv.shift(), process.argv, {
                    cwd: process.cwd(),
                    detached : true,
                    stdio: "inherit"
                });
            });
            process.exit();
        }, 5000);
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
                if(Math.floor(counter/24) === 1)
                    msg.channel.send('Rebel has been missing for 1 day and 1 hour!!');
                else
                    msg.channel.send('Rebel has been missing for '+ Math.floor(counter/24) + ' days and 1 hour!!');
            else if(Math.floor(counter/24) === 1)
                msg.channel.send('Rebel has been missing for 1 day and '+ counter%24 + ' hours!!');
            else
                msg.channel.send('Rebel has been missing for '+ Math.floor(counter/24) + ' days and ' + counter%24 + ' hours!!');
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



RebelAFKBot.login('OTY3MTU5MzIzODk5ODY3MjM2.YmMPTw.7FjPYtBTTJfbzddo0rImR_9D2bw');
