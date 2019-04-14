
var btnSend = document.querySelector(".bottom_bar button"),
    edtText = document.querySelector(".bottom_bar input"),
    chatArea = document.querySelector(".chat_log"),
    radioButtons = document.querySelectorAll(".radio-button"),
    count = 0,
    btnClose = document.querySelector('.close'),
    chatButton = document.querySelector('.chat_icon'),
    botArea = document.querySelector('.container'),
    answers = [
                ['What is the problem you are facing?'],
                ['Transferring to team...'],
                ['Enter below to leave a feedback.'],
                ['Hey', 'Hello'],
                ['Thank you so much']
            ] ,
    questions = [
        ['continue'],
        ['contact team'],
        ['leave a feedback'],
        ['hi'],
        ['your service is awesome']
    ];

btnClose.addEventListener('click', function(){
    botArea.classList.toggle('hide');
    chatButton.style.display = 'flex';
});

chatButton.addEventListener('click', function(){
    botArea.classList.toggle('hide');
    chatButton.style.display = 'none';
});

radioButtons.forEach(function(r){
    r.addEventListener('click', radioClicked);
})


btnSend.addEventListener('click', function(){

    var input = takeInput(String(edtText.value));
    
    if(input == ""){
        return;
    }
    edtText.value = "";
    createUserMessage(input);
    createBotMessage(reply(input));
});

function takeInput(input){
    input = input.trim();
    return input;
}

function createUserMessage(text){
    var user_group = document.createElement("div");
    var user_text = document.createElement("div");

    user_group.classList.add("user_group");
    user_text.classList.add("user_text");

    user_text.appendChild(document.createTextNode(text));
    
    var when = document.createElement('div');
    when.classList.add('when');
    var time = formatAMPM(new Date());
    
    when.innerHTML = time;
    user_text.appendChild(document.createElement('br'));
    user_text.appendChild(when);
    user_group.appendChild(user_text);
    
    chatArea.appendChild(user_group);
}

function createBotMessage(text){
    var bot_group = document.createElement("div");
    var bot_text = document.createElement("div");
    var bot_pic = document.createElement('div');

    bot_group.classList.add("bot_group");
    bot_text.classList.add("bot_text");
    bot_pic.classList.add('bot_pic');

    bot_text.appendChild(document.createTextNode(text));
    
    var when = document.createElement('div');
    when.classList.add('when');
    var time = formatAMPM(new Date());
    
    when.innerHTML = time;
    bot_text.appendChild(document.createElement('br'));
    bot_text.appendChild(when);
    bot_group.appendChild(bot_pic);
    bot_group.appendChild(bot_text);
    
    chatArea.appendChild(bot_group);
}

edtText.addEventListener('keypress',(e) => {
    if(e.keyCode === 13){
        btnSend.click();
    }
});

function radioClicked(e){
    var input = takeInput(e.target.textContent);
    var dot = e.target.querySelector('.radio-button-dot');
    dot.style.backgroundColor = "#0069ff";
    radioButtons.forEach(function(childs){
        childs.removeEventListener('click', radioClicked);
    })
    createUserMessage(input);
    var r = reply(input);
    createBotMessage(r);
}
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function reply(que){
    que = que.toLowerCase();
    var found = 0;
    var ret = "";

    for(var x = 0; x < questions.length; x++){
		if(found === 1){
			//found = 0;
			break;
		}else{
			for(var y=0; y < questions[x].length; y++){
				if(questions[x][y] == que){
					ret = answers[x][Math.floor(Math.random() * answers[x].length)];
					found = 1;
                    break;
                }else{
                    ret = "Sorry, I didn't got you!";
                }
            }
        }
    }

    return ret;
}