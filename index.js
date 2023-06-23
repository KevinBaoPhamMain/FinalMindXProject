import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, set, ref, child, get } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
   
$('.carousel').carousel()
let products = [
    {
        name : "Hand DIY",
        type : "machine",
        require : "an app",
        cost: "150.000",
        function: "It just grab stuff.",
        img : "products/HandDIY.jpg"
    },
    {
        name : "Save The Dog",
        type : "machine",
        require : "an app",
        cost: "135.000",
        function: "Gives food.",
        img : "products/SaveTheDog.jpg"
    },
    {
        name : "Flashlight",
        type : "machine",
        require : "an app",
        cost: "100.000",
        function: "It is a light",
        img : "products/WorkInProgress.jpg"
    },
    {
        name : "Water Rocket",
        type : "machine",
        require : "your brain",
        cost: "50.000",
        function: "Shoot stuff",
        img : "products/WorkInProgress.jpg"
    },
    {
        name : "Not A Bomb",
        type : "bomb",
        require : "nothing",
        cost: "200.000",
        function: "Boom",
        img : "products/NotABomb.jpg"
    },
    {
        name : "This Thing",
        type : "IDK",
        require : "nothing",
        cost: "30.000",
        function: "I actually don't know",
        img : "products/ThisThing.jpg"
    },
    {
        name : "Crosswords",
        type : "puzzle",
        require : "printer",
        cost: "60.000",
        function: "Solve it!",
        img : "products/Crosswords.jpg"
    }
]


// Firebase auth
      
// Your web app's Firebase configuration
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
    var dataName = document.getElementById("dataName")
    var dataLogin = document.getElementById("loginButton")
    var dataSignup = document.getElementById("signupButton")
    get(child(dbRef, `users/${localStorage.user}`))
    .then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val())
        dataName.innerHTML = `Hello <b>${snapshot.val().Name}</b>!`
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


let carts1 = []
let cartsJson = JSON.stringify(carts1)
localStorage.setItem("KevCart", cartsJson)

let items = document.querySelector('.items')
let carts = JSON.parse(localStorage.getItem('KevCart'))

items.addEventListener('click', function(e){
        if(e.srcElement.tagName == "BUTTON"){
            let i = e.srcElement.value
            carts.push(products[i].name)
            carts.push(products[i].cost)
            console.log(carts)
            let cartsJson = JSON.stringify(carts)
            localStorage.setItem('KevCart', cartsJson)
            
        }
    
    
})

let cartButton = document.getElementById('cart')
cartButton.addEventListener('click', function(){
    let CheckCarts = JSON.parse(localStorage.getItem('KevCart'))
    let CCJson = JSON.stringify(CheckCarts)
    localStorage.setItem('SelectItems', CCJson)
    location.replace("carts.html")
})

let aboutUsButton = document.getElementById('aboutUs')
aboutUsButton.addEventListener('click', function(){
    location.replace("aboutUs.html")
})

let startPageButton = document.getElementById('startPage')
startPageButton.addEventListener('click', function(){
    location.replace("introPage.html")
})

function load(arr){
    let items = document.querySelector('.items')
    let html = "";
    let count = 1;
    let index = 0;
    for(var i of arr){
        if(count == 1){
            html += `<div class="row" style="margin-top: 10px;">`  
        }
        html += 
        `
            <div class="col-3">
                <div class="card text-black">
                    <i class="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                    <img src="${i.img}" class="card-img-top" alt="Product Picture" />
                    <div class="card-body">
                        <div class="text-center">
                            <h5 class="card-title">${i.name}</h5>
                            <p class="text-muted mb-4">${i.type}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Requirements: </span><span>${i.require}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>How it works: </span><span>${i.function}</span>
                        </div>
                        <div class="d-flex justify-content-between total font-weight-bold mt-4">
                            <span>Total cost: </span><span>${i.cost} VND</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <button value = ${index}>Buy!</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        ` 
        if(count == 4){
            html +=`</div>`
            count = 0;
        }
        count++;
        index++;
    }
    items.innerHTML = html
}

load(products)