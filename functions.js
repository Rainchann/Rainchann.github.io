let ipt1 = document.getElementById("ipt1")
let btn1 = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")

// const APILINK = "http://127.0.0.1:8000/api/v1/rtchat/";
const APILINK = "http://localhost:8000/api/v1/rtchat/"

function SaveUsername() {
    console.log('saving username...', ipt1.value)
    const username = ipt1.value;

    fetch(APILINK + "new", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            // "Access-Control-Allow-Origin" : "*", 
            // "Access-Control-Allow-Credentials" : true
        },
        body: JSON.stringify({"username": username})
    }).then(res => {
        console.log(JSON.stringify({"username": username}))
        if (res.status == 200) return res.json();
        else{
            console.log('no response')
            return Promise.reject(res);
        };
    })
        .then(res => {
        console.log(res);
        location.reload();
    })
}