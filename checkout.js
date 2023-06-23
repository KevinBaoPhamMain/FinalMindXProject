let cartFill = document.getElementById("cartFill")
let cartList = JSON.parse(localStorage.getItem("SelectItems"))
let cart = []
let buyButton = document.getElementById("submitData")
let giftcodeList = ["FUNNY", 10, "RELEASE", 50]
let giftcodeUsed = ""

const firebaseConfig = {
    apiKey: "AIzaSyAtgSiPlTmes1Bw1Bgz16XZlCuvJwTJq20",
    authDomain: "foundation69420.firebaseapp.com",
    databaseURL: "https://foundation69420-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "foundation69420",
    storageBucket: "foundation69420.appspot.com",
    messagingSenderId: "729530639121",
    appId: "1:729530639121:web:46bb165e0194437ad122b0"
};

if(localStorage.SelectItems){
    for(let i in cartList){
        if(i%2 == 0){
            let checkExist = cart.includes(cartList[i])
            if(checkExist == false){
                cart.push(cartList[i])
                cart.push(1)
                
            }
            else{
                let locate = cart.indexOf(cartList[i])
                cart[locate+1] += 1
            }
        }
        else{
            let checkExist = cart.includes(cartList[i])
            if(checkExist == false){
                cart.push(cartList[i])
            }
        }
    }
    console.log(cart)
    localStorage.setItem("GIFTCODE", "no")
    //Adding to list
    let fullCash = localStorage.getItem("fullCash")
    let html = ""
    for(let x in cart){
        let x1 = Number(x)+1
        let x2 = Number(x)+2
        if(x % 3 == 0){
            html += `<p>${cart[x]}: ${cart[x1]}    x ${cart[x2]}</p>`
        }
    }
    html += `<p>Total amount: ${fullCash*1000} VND</p>`
    cartFill.innerHTML = html

    let giftCodeButton = document.getElementById("giftcodeButton")
    
    giftCodeButton.addEventListener('click', function(){
        console.log("GIFT CODE TIME!")
        let giftcode = document.getElementById("giftcode").value
        if(giftcode.length > 0){
            
            console.log("YOU ENTER GIFT CODE!")
            let checker = giftcodeList.includes(giftcode)
            if(checker == true){
                console.log("IT EXIST!")
                let findLoc = giftcodeList.indexOf(giftcode)
                let html = ""
                for(let x in cart){
                    let x1 = Number(x)+1
                    let x2 = Number(x)+2
                    if(x % 3 == 0){
                        html += `<p>${cart[x]}: ${cart[x1]}    x ${cart[x2]}</p>`
                    }
                }
                fullCash *= 1-(giftcodeList[findLoc+1])/100
                html += `<p>Discount code: -${giftcodeList[findLoc+1]}%</p>`
                html += `<p>Total amount: ${fullCash * 1000} VND</p>`
                cartFill.innerHTML = html
                html = ""
                giftcodeUsed = giftcode
                let giftCodePlace = document.getElementById("giftCodePlace")
                giftCodePlace.innerHTML = html
                localStorage.setItem("GIFTCODE", "yes")
            }
            else{
                alert("Gift code does not exist.")
            }
        }
        else{
            console.log("NO GIFT CODE TIME!")
        }
    })


    buyButton.addEventListener('click', function(){
        let fullBody = document.getElementById("fullBody")
        let emailValue = document.getElementById("email").value
        let bankNvalue = document.getElementById("bankN").value
        let bankPvalue= document.getElementById("bankP").value
        let addressValue = document.getElementById("address").value
        let nameValue = document.getElementById("name").value
        let countryValue = document.getElementById("country").value
        let htmlE = ""

        if(emailValue.length > 0){
            if(bankNvalue.length > 0){
                if(bankPvalue.length > 0){
                    if(nameValue.length > 0){
                        if(addressValue.length > 0){
                            if(countryValue.length > 0){
                                let YesNoGC = localStorage.getItem("GIFTCODE")
                                console.log(YesNoGC)
                                if(YesNoGC == "yes"){
                                    console.log("changing localstorage, im dumb")
                                    let giftcode = giftcodeUsed
                                    if(localStorage.GSHistory){
                                        let GSHList = JSON.parse(localStorage.getItem("GSHistory"))
                                        let checker = GSHList.includes(giftcode)
                                        if(checker == true){
                                            alert("GIFT CODE ALREADY USED IN DEVICE! RETURN TO NORMAL!")
                                            location.reload()
                                        }
                                    }
                                    else{
                                        let GSHList = [giftcode]
                                        let GSHLJSONstringify = JSON.stringify(GSHList)
                                        localStorage.setItem("GSHistory", GSHLJSONstringify)
                                        htmlE +=  
                                        `<div class="d-flex justify-content-between">
                                            <p>Purchase Complete!</p>
                                        </div>`
                                        fullBody.innerHTML = htmlE
                                        alert("Successfully bought :D")
                                        location.replace("index.html")
                                    }
                                }
                                else{
                                    htmlE +=  
                                    `<div class="d-flex justify-content-between">
                                        <p>Purchase Complete!</p>
                                    </div>`
                                    fullBody.innerHTML = htmlE
                                    alert("Successfully bought :D")
                                    location.replace("index.html")
                                }
                                
                            }
                            else{
                                alert("There's nothing in the country!")
                            }
                        }
                        else{
                            alert("There's nothing in the address!")
                        }            
                    }
                    else{
                        alert("There's nothing in the name!")
                    }
                }
                else{
                    alert("There's nothing in the bank provider!")
                }
            }
            else{
                alert("There's nothing in the bank number!")
            }            
        }
        else{
            alert("There's nothing in the email!")
        }
    })
}