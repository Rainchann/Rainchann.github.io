let ipt1 = document.getElementById("ipt1")
let btn1 = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")
const chatContainer = document.querySelector(".chatContainer")
const datetime = new Date()
// const APILINK = "http://127.0.0.1:8000/api/v1/rtchat/";
const APILINK = "http://localhost:8000/api/v1/rtchat/"

function SaveUsername() {
  let username = ipt1.value;
  localStorage.setItem("user_name_rcweb", username)
}

function GetMessages() {
  fetch(APILINK+"getmsg",
  )
  .then(res => res.json())
    .then(function(data){
    data.forEach(element => {
      // console.log(element);
      returnMsg(element.uniqueId, element.username, element.message, element.sentTime);
    });
  });
}

function formatMsg(uniqueId, username, msg, time) {
    //custom
    if (username == 'Shirley') {
      name_color = '#C5FFDC';
    } else {
      name_color = 'pink';
    }
    return (
      `
          <div class="chat">
            <div class="time" style="color:#DDE2D8">${time}</div>
            <div class="${username} name" style="color: ${name_color}">${username}:
              </div>
              <div class="message" id=${uniqueId}>${msg}</div>
          </div>
      `
     )
     
  }

  function returnMsg(uniqueId, username, message, currentTime) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
    chatContainer.innerHTML += formatMsg(uniqueId, username, message, currentTime)
  }
  
  function OutputMsg() {
    let username;
    let message = ipt1.value;
    let uniqueId = generateUniqueId();
    let currentTime = getDate();
    if (localStorage.getItem("user_name_rcweb") == null) {
      ipt1.textContent = "Please name yourself first ^^, Thank you :)"
      return
    } else {
      username = localStorage.getItem("user_name_rcweb")
    }

    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
          // "Access-Control-Allow-Origin" : "*", 
          // "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify({"uniqueId": uniqueId, "username": username, "message": message, "sentTime": currentTime})
  }).then(res => {
      if (res.status == 200) {
        // console.log(res)
        return res.json();}
      else{
          console.log('no response')
          return Promise.reject(res);
      };
  })
      .then(res => {
      // console.log(res);
      // location.reload();
  })
  // main ? '' : sendNoti(); 

  // chatContainer.scrollTop = chatContainer.scrollHeight;
  // chatContainer.innerHTML += formatMsg(uniqueId, username, message, currentTime)
  ipt1.value = '';

  }
  
  function getDate() {
    let month = datetime.getMonth();
    let hour = String(datetime.getHours()).padStart(2, '0');
    let min = String(datetime.getMinutes()).padStart(2, '0');
    return hour+":"+min;
  }
  
  function enterUsername() {
    username = ipt1.value;
    ipt1.value = '';
  
    localStorage.setItem("rains_uname", username);
  }

  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
  
    return `id-${timestamp}-${hexadecimalString}`;
  }

  function getDate() {
    let month = datetime.getMonth();
    let hour = String(datetime.getHours()).padStart(2, '0');
    let min = String(datetime.getMinutes()).padStart(2, '0');
    return hour+":"+min;
  }

  GetMessages();