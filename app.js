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
  '簽到':['請輸入簽到號碼'],
  '出席率查詢':['出席率尚未計算']
};

var help_message = "可使用的關鍵字：" + "\n";

var button = false;
var pwd = Math.floor(Math.random()*1000);
var sign_in_times = []; // 使用者：簽到次數
var registering = []; //誰要簽到
console.log(pwd);


bot.on('message', function (event) {
    // 當有人傳送訊息給Bot時，event.message.text是使用者傳給bot的訊息
    
    (async () =>{
      let f = await event.source.profile();
      //console.log(f);

    })();
    // 準備要回傳的內容
    var replyMsg = `${event.message.text}`;


    if (button === true && event.message.text == pwd){
      replyMsg = "簽到成功";
        if (registering.indexOf(event.source.userId) != -1){
          delete registering[registering.indexOf(event.source.userId)];
        }      
      console.log(registering)
      button = false;
    }else if (button === true){
      replyMsg = "簽到失敗";
      button = false;
    }

    if (event.message.text in help){
      replyMsg = help[event.message.text];
      
      if(event.message.text === "簽到"){
        button = true;
        if (registering.indexOf(event.source.userId) === -1){
          registering.push(event.source.userId);
          console.log(registering);
        }
      }

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