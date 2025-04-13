import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const itemsArr = document.getElementById("items")
const orderItems = document.getElementById("orderItems")
const totalPrice = document.getElementById("totalPrice")
const orderResumeModal = document.getElementById("orderResume")

let orderResume = [];

document.addEventListener("click",function(e){
    //e.preventDefault()
    if(e.target.classList[0] == 'addItemBtn'){
        orderResume.length == 0 && orderResumeModal.classList.toggle('hidden')
        addItemToOrder(e.target.id)
    }
    else if (e.target.classList[0] == 'removeBtn'){
        removeOrderItem(e.target.id)
        orderResume.length == 0 && orderResumeModal.classList.toggle('hidden')
    }
    else if (e.target.classList[0] == 'completeOrderBtn'){
        document.getElementById("paymentDetailsModal").classList.toggle('hidden')
    }
    else if (e.target.classList[0] == 'payBtn'){
        e.preventDefault()
        validateCardForm()
    }

})

function addItemToOrder(itemId){
    document.getElementById("thanksForOrderPanel").classList.add('hidden')
    const itemSelected = menuArray.filter( item => item.id == itemId)[0]
    orderResume.push({
        "name": itemSelected.name,
        "price": itemSelected.price,
        "id": uuidv4()
    })

    renderOrderResume()
}

function removeOrderItem(itemId){
    orderResume = orderResume.filter(item => item.id !== itemId)
    renderOrderResume()
}

function validateCardForm(){
    
    const form = document.getElementById('cardForm')
    let nameInput = document.forms["cardForm"]["name"].value
    let cardNumberInput = document.forms["cardForm"]["card-number"].value
    let cvvInput = document.forms["cardForm"]["cvv"].value

    if (form.checkValidity()){
        document.getElementById("paymentDetailsModal").classList.toggle('hidden')
        document.getElementById("orderResume").classList.toggle('hidden')
        document.getElementById("thanksForOrderPanel").classList.toggle('hidden')
        document.getElementById("thanksText").innerText = `Thanks, ${nameInput}! Your order is on its way!`
        orderResume = []
    }else{
        //validate name input
        
        if (nameInput == "") {
            alert("Name must be filled out")
            return false
        } 

        //Card number validations
        if (cardNumberInput == "") {
            alert("Card Number must be filled out")
            return false
        }else if(isNaN(cardNumberInput)){
            alert("Card Number must be only numbers")
            return false
        }else if(cardNumberInput.length < 16){
            alert("Card Number must be 16 numbers")
            return false
        }

        //CVV validations
        if (cvvInput == "") {
            alert("CVV must be filled out")
            return false
        }else if(isNaN(cvvInput)){
            alert("Card Number must be only numbers")
            return false
        }else if(cvvInput.length < 16){
            alert("Card Number must be 16 numbers")
            return false
        }
    }
}

function renderOrderResume(){
    totalPrice.innerText = '$' + orderResume.reduce( (total, currentItem) => total + currentItem.price, 0 )
    orderItems.innerHTML = orderResume.map( item =>  
                    `<div class="orderItem" id="orderItem">
                        <div>
                            <h3>${item.name}</h3>
                            <button class="removeBtn" id="${item.id}">remove</button>
                        </div>
                        <h4>$${item.price}</h4>               
                    </div>`
    ).join('')
}


function renderMenu(){
    itemsArr.innerHTML = menuArray.map( item => 
              `<div class="item" id="item">
                        <h1 class="foodIcon">${item.emoji}</h1>
                        <div class="itemDetails" id="itemDetails">
                            <h3>${item.name}</h3>
                            <p>${item.ingredients.join(', ')}</p>
                            <h4>${item.price}</h4>
                        </div>
                        <button class="addItemBtn" id="${item.id}">+</button>
                     </div>`
    ).join('')
}

renderMenu()