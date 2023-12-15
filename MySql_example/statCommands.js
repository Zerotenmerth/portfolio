const DB = require('../globalCommands/dbCommands');
const dbCommands = new DB();

const SI= require('../globalCommands/serverInfo');
const servInfo =new SI();

const BF = require('../globalCommands/botFunctions');
const botFunc = new BF();

async function Top5Anything(message)
{
	let statName= message.content.substring(6);
	let sqlResuest; let endLine; let startLine; let variable;
	switch(statName)
	{
		case 'Character':
			sqlResuest=`SELECT s_gamestat.stat_character, users.nick_name FROM s_gamestat, users 
			WHERE users.id_user = s_gamestat.id_user 
			ORDER BY s_gamestat.stat_character DESC LIMIT 5`;
			startLine=`__Top 5 in game Character__${servInfo.emoji.nepu}:`;
			endLine=`points`;
			variable='stat_character';
			break;

		case 'Exp':
			sqlResuest=`SELECT users.nick_name, users.exp_all FROM users ORDER BY exp_all DESC LIMIT 5`;
			startLine=`__Top 5 by Experience__${servInfo.emoji.nepu}:`; 
			endLine=`points`;
			variable='exp_all';
			break;

		case 'Voice':
			sqlResuest=`SELECT s_userstat.all_time_voice, users.nick_name FROM s_userstat, users 
			WHERE users.id_user = s_userstat.id_user 
			ORDER BY s_userstat.all_time_voice DESC LIMIT 5`;
			startLine=`__Top 5 by time in voice chats__${servInfo.emoji.nepu}:`;
			endLine=`hours`;
			variable='all_time_voice';
			break;

		case 'Msg':
			sqlResuest=`SELECT s_userstat.message_count, users.nick_name FROM s_userstat, users 
			WHERE users.id_user = s_userstat.id_user 
			ORDER BY s_userstat.message_count DESC LIMIT 5`;
			startLine=`__Top 5 spam chat players__${servInfo.emoji.nepu}:`;
			endLine=`sms`;
			variable='message_count';
			break;
	}
		if(startLine)
		{
			 data= await dbCommands.FreeSqlRequest(sqlResuest, true);

			function FindValue(obj)
			{ 
				for(var key in obj)
				{
					if(key==variable)
					{
						if(key=='all_time_voice')
						return (obj[key]/60).toFixed(1)
						else
						return obj[key];
					}
				}
			}

			let line=startLine; 
			for(let i=0; i<data.length; i++) 
			{
				line+=`\n${i+1}. ${data[i].nick_name} - **${FindValue(data[i])}** ${endLine}`;
			}
			botFunc.SendMessage(1752220, line, message.channel.id);
		}
		else {
			botFunc.SendMessage(15158332, 'Unknown command!', message.channel.id);
		}
}
async function GetGameStat(message)
{
			let	data = await dbCommands.SelectData('s_gamestat', `id_user=${message.author.id}`);
			botFunc.SendMessage(10181046,`__Count of guessess__:
			*characters* - **${data.stat_character}**
			*words* - **${data.stat_word}** 
			*openings* - **${data.stat_op}**`, message.channel.id);
}

module.exports.Top5Anything = Top5Anything;
module.exports.GetGameStat = GetGameStat;