import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, set, ref, child, get } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAtgSiPlTmes1Bw1Bgz16XZlCuvJwTJq20",
    authDomain: "foundation69420.firebaseapp.com",
    databaseURL: "https://foundation69420-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "foundation69420",
    storageBucket: "foundation69420.appspot.com",
    messagingSenderId: "729530639121",
    appId: "1:729530639121:web:46bb165e0194437ad122b0"
};
      
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();
        
if(localStorage.user){
    console.log(localStorage.user)
    const dbRef = ref(getDatabase());
    var dataLogin = document.getElementById("loginButton")
    var dataSignup = document.getElementById("signupButton")
    get(child(dbRef, `users/${localStorage.user}`))
    .then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val())
        dataSignup.innerHTML = ` `
        dataLogin.innerHTML = ` `

    } else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error(error);
    });

}else{
    console.log("Non-exist")
}

let container = document.getElementById('container')

if(localStorage.SelectItems){
    let totalCash = 0
    let html = ""
    let carts = JSON.parse(localStorage.getItem('SelectItems'))
    console.log(carts)
    let cartLen = carts.length
    if(cartLen == 0){
        html += 
        `
        <div class="d-flex justify-content-center">
            <h1 font-size: 40px>There's nothing! Buy something!<h1>
        </div>
        
        `
    }
    else{
        let counter = 0
        let count = 1;
        for(let i in carts){
            if(count == 1){
                html += `<div class="row" style="margin-top: 10px;">`  
            }
            if(counter == 0){
                let noSpace = carts[i].replaceAll(" ","")
                console.log(noSpace)
                html += 
                `
                <div class="col-3" style = "margin-left: 0px">
                    <div class="card text-black" style ="background-color: gray">
                        <img src="products/${noSpace}.jpg" class="card-img-top" alt="Product Picture" />
                        <div class="d-flex justify-content-between">
                            <span>What you have bought: </span><span>${carts[i]}</span>
                        </div>
                `
                counter += 1
            }
            else{
                totalCash += Number(carts[i])
                html +=
                    `<div class="d-flex justify-content-between">
                        <span>Cost: </span><span>${carts[i]}</span>
                    </div>
                </div>
                </div>
                `
                counter = 0
            }
            if(count == 8){
                html +=`</div>`
                count = 0;
            }
            count++
        }
    }
    console.log(totalCash)
    container.innerHTML = html
    html = ""
    html +=
    `
    <p style="font-size: 30px">${totalCash}.000 VND</p>
    `
    let totalCashID = document.getElementById('totalCash')
    totalCashID.innerHTML = html
    localStorage.setItem("fullCash", totalCash)
}   

let buyButton = document.getElementById('buyButton')
buyButton.addEventListener('click', function(){
    location.replace("checkout.html")
})