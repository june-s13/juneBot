const { executionAsyncResource } = require('async_hooks');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const { YTSearcher } = require('ytsearcher');

const searcher = new YTSearcher({
    key: "HIDDEN", //hiding youtube api key
    revealed: true
});

const client = new Discord.Client();

const queue = new Map();

client.on("message", async(message) => {
    const prefix = '^';

    const serverQueue = queue.get(message.guild.id);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) return;
        

    switch(command){
		 case 'help':
            message.channel.send('Music Commands are: `play` `skip` `stop` . Other commands are `motivateme` `whatrobloxgame` `stratroulettet` `stratroulettect` `pickle` `mynewleaguemain` `allstar` `kiss` and `slap`. The prefix is `^` ! ');
			break;
        case 'allstar':
    		message.channel.send(
            `Somebody once told me the world is gonna roll me
            I ain't the sharpest tool in the shed
            She was looking kind of dumb with her finger and her thumb
            In the shape of an "L" on her forehead`);
            break;
        case 'mynewleaguemain':
    		const list22 = ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "Aurelion Sol", "Azir", "Bard", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki", "Darius", "Diana", "Dr. Mundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar","Gragas", "Graves", 
        "Hecarim", "Heimerdinger", "Illaoi", "Irelia", "Ivern", "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "Kai'Sa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Kha'Zix", "Kindred", "Kled", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lillia",
        "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee","Nocturne", "Nunu", 
         "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy","Pyke", "Qiyana", "Quinn","Rakan", "Rammus", "Rek'Sai", "Rell", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Vel'Koz", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath", "Xin Zhao","Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Ziggs", "Zilean", "Zoe", "Zyra", "Gwen"];
            const lis23 = Math.floor(Math.random() * list22.length);
            message.channel.send(list22[lis23]);        
            break;
        case 'stratroulettet':
            const strats = ["RUSH B CANT STOP WONT STOP", "4 Smokes B, have 2 popflash and go in while the rest execute A", "Bait out your whole team, if thehy ask why, say COCK"];
            const stratlist = Math.floor(Math.random() * strats.length);
            message.channel.send(strats[stratlist]);
            break;    
        case 'motivateme':
            const m349 = ["You can do it!", "Believe in yourself", "swag swag", "motivation","BELIEVE IN THE JUNEBOT THAT BELIEVES IN YOU", "YOU WILL PIERCE THE HEAVENS"];
            const stratlist34 = Math.floor(Math.random() * m349.length);
            message.channel.send(m349[stratlist34]);
            break;   
        case 'stratroulettect':
            const strats2 = ["If eco stack B site", "Nade stack whatever site u go to every single time"];
            const stratlist2 = Math.floor(Math.random() * strats2.length);
            message.channel.send(strats2[stratlist2]);  
            break;
  		case 'slap':
    		message.channel.send('OUCH!');
            break;
        case 'pat <@user-id>':
            message.channel.send("*pats* <@" + user-id + ">");
            break;
        case 'kiss':
            message.channel.send("*kisses* (❀˘꒳˘)♡(˘꒳˘❀) <@" + message.author.id + ">");
            break;
        case 'whatrobloxgame':
            const strats4 = ["Build a Boat", "Any Tyccoon", "Phantom Forces", "Murder Mystery"];
            const stratlist4 = Math.floor(Math.random() * strats4.length);
            message.channel.send(strats4[stratlist4]);  
            break;     
  		case 'pickle':
    		message.channel.send('PICKLE RICK!!!');
            break;
        case 'play':
            execute(message, serverQueue);
            break;
        case 'stop':
            stop(message, serverQueue);
            break;
        case 'skip':
            skip(message, serverQueue);
            break;
    }
        
    async function execute(message, serverQueue){
        let vc = message.member.voice.channel;
        if(!vc){
            return message.channel.send("juneBot says: `please join a v o i c e c h a n n e l !`");
        }else{
            let result = await searcher.search(args.join(" "), { type: "video" })
            const songInfo = await ytdl.getInfo(result.first.url)

            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            };

            if(!serverQueue){
                const queueConstructor = {
                    txtChannel: message.channel,
                    vChannel: vc,
                    connection: null,
                    songs: [],
                    volume: 10,
                    playing: true
                };
                queue.set(message.guild.id, queueConstructor);

                queueConstructor.songs.push(song);

                try{
                    let connection = await vc.join();
                    queueConstructor.connection = connection;
                    play(message.guild, queueConstructor.songs[0]);
                }catch (err){
                    console.error(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(`Unable to join the voice chat ${err}`)
                }
            }else{
                serverQueue.songs.push(song);
                return message.channel.send(`juneBot says: Audio added to q u e u e ${serverQueue.songs[0].url}`);
            }
        }
    }
    function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
            serverQueue.vChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () =>{
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            serverQueue.txtChannel.send(`Now playing ${serverQueue.songs[0].url}`)
    }
    function stop (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("juneBot says `please join v o i c e f i r s t p l z`")
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
    function skip (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("juneBot says `please join v o i c e f i r s t p l z`");
        if(!serverQueue)
            return message.channel.send("juneBot says `There is n o t h i n g  to s k i p !`");
        serverQueue.connection.dispatcher.end();
    }
})

client.login("HIDDEN") //hiding discord api key