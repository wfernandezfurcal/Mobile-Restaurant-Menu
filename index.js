import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const itemsArr = document.getElementById("items")
const orderItems = document.getElementById("orderItems")
const totalPrice = document.getElementById("totalPrice")

let orderResume = [];

document.addEventListener("click",function(e){
    if(e.target.classList[0] == 'addItemBtn'){
        addItemToOrder(e.target.id)
    }
    else if (e.target.classList[0] == 'removeBtn'){
        removeOrderItem(e.target.id)
    }
})

function addItemToOrder(itemId){

    //orderResume == [] && 
    //document.getElementById("orderResume").classList.toggle('hidden')

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