let ipt1 = document.getElementById("ipt1")
let btn1 = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")

const APILINK = 'http://127.0.0.1:5500/index.html/api/v1/rchat/';

function SaveUsername() {
    console.log('saving username...')
    const username = ipt1.value;

    fetch(APILINK + 'new', {
        method: 'PUT',
        header: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true 
        },
        body: JSON.stringify({"username": username})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            location.reload();
    })
}