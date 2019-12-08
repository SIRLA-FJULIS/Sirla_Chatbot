// 引用linebot SDK        
var linebot = require('linebot');
//引用dotenv 套件
require('dotenv').config()

var bot = linebot({
  // 用於辨識Line Channel的資訊
  channelId: process.env.channelId,
  channelSecret:process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
});


var help = {
  '課程資訊':['12月4日(三) JavaScript課程，講師為龔琪雅'],
  '簽到':['簽到系統尚未開啟'],
  '出席率查詢':['出席率尚未計算']
};

var help_message = "可使用的關鍵字：" + "\n";

bot.on('message', function (event) {
    // 當有人傳送訊息給Bot時，event.message.text是使用者傳給bot的訊息
    
    // 準備要回傳的內容
    var replyMsg = `${event.message.text}`;
    
    if (event.message.text in help){
      replyMsg = help[event.message.text];
      
    }else if(event.message.text === '幫助'){
      for(var name in help){
        help_message += name +'\n';
      }
      replyMsg = help_message;
    }

    // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
    event.reply(replyMsg).then(function (data) {
        // 當訊息成功回傳後的處理
    }).catch(function (error) {
        // 當訊息回傳失敗後的處理
    }); 
});

// Bot所監聽的webhook 路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});