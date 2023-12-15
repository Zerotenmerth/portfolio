const DB = require('../globalCommands/dbCommands');
const dbCommands = new DB();

const SI= require('../globalCommands/serverInfo');
const servInfo =new SI();

const BF = require('../globalCommands/botFunctions');
const botFunc = new BF();

async function GetDetailInfo(message)
{
    let authorID = message.author.id;
    let dateObj =message.member.joinedAt.toString().split(' ');
    let sql=`SELECT users.current_lvl, users.exp_all, users.exp_now, 
    levels.need_exp, ranks.rank_name, 
    s_userstat.message_count, s_userstat.command_count, s_userstat.all_time_voice
    FROM users, levels, ranks, s_userstat WHERE users.id_user='${authorID}' 
    AND users.current_lvl = levels.id_lvl 
    AND ranks.id_rank=levels.id_rank AND s_userstat.id_user='${authorID}'`;
    let obj = await dbCommands.FreeSqlRequest(sql);
    let hours = (obj.all_time_voice/60).toFixed(1);

    botFunc.SendMessage(8359053, `__**Full information**__${servInfo.emoji.tsumi}:
    Rank: **${obj.rank_name}**
    Your current lvl: **${obj.current_lvl}**
    Total experience: **${obj.exp_all}** 
    Send message count: **${obj.message_count}**
    Commands used count: **${obj.command_count}**
    Time in voice chats: **${hours}** hours
    Joined to us: *${dateObj[2]} ${dateObj[1]} ${dateObj[3]}*`, message.channel.id);
}

module.exports.GetDetailInfo = GetDetailInfo;