import { menuArray } from "./data.js"

const itemsArr = document.getElementById("items")
const orderItems = document.getElementById("orderItems")

document.addEventListener("click",function(e){
    if(e.target.classList[0] == 'addItemBtn'){
        addItemToOrder(e.target.id)
    }
})

function addItemToOrder(itemId){

    const itemSelected = menuArray.filter( item => item.id == itemId)[0]

    orderItems.innerHTML += 
                    `<div class="orderItem" id="orderItem">
                        <div>
                            <h3>${itemSelected.name}</h3>
                            <button class="removeBtn">remove</button>
                        </div>
                        <h4>${itemSelected.price}</h4>                    
                    </div>`
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