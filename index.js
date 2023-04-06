import { menuArray } from '/data.js'
const menuCard = document.getElementById("menu-card")
const addBtn = document.getElementById("add-btn")
const orderBox = document.getElementById("order-box")
let priceSelectedItem = document.getElementById("price-selected-item")
let finalPrice = document.getElementById("final-price")
let priceOfEach = [];
let orderedItem = [];

function getMenuHtml(){
    let menuHtml = '';
    menuArray.forEach(function(menu){
             menuHtml += `<div class="food-items">
                                <div class="food-details">
                                    <div class="food-emoji">
                                        <p>${menu.emoji}</p>
                                    </div>
                                    <div>
                                        <p id="name">${menu.name}</p>
                                        <p id="ingredients">${menu.ingredients}</p>
                                        <p id="price">${"$" + menu.price}
                                    </div>
                                </div>
                                <div class="add-items">
                                    <p id="add-btn" data-add="${menu.id}">➕</p>
                                </div>
                          </div>`
                          
    })
    return menuHtml
}
menuCard.innerHTML = getMenuHtml();

// EVENT LISTENER

document.addEventListener('click',function(e){
 if(e.target.dataset.add){
   yourOrderBox(e.target.dataset.add)
   document.getElementById("order-heading").style.display="block";
   document.getElementById("total").style.visibility="visible";
 }
 else if(e.target.dataset.remove){
   removeItem(e.target.dataset.remove)
 }
})

//  FUNCTION TO DISPLAY ORDER

function yourOrderBox(menuId){
    const selectedItem = menuArray.filter(function(menu){
        return menu.id == menuId
    })[0]
console.log(selectedItem)
    let addItem =' ';
    addItem = `<div class="item-name-price">
                        <div class="item-name-remove">
                        <p class="item-name">${selectedItem.name}</p>
                        <p id="remove-item-btn" data-remove="${selectedItem.id}">remove</p>
                        </div>
                        <p id="price-selected-item">$ ${selectedItem.price}</p>
                   </div>`;
    orderedItem.push(addItem)
    console.log(orderedItem)
    orderBox.innerHTML = orderedItem
    totalPriceCalc(selectedItem)
}



// FUNCTION TO CALCULATE TOTAL PRICE

function totalPriceCalc(menu){
priceOfEach.push(menu.price)
console.log(priceOfEach)  
let totalPrice = priceOfEach.reduce(calcTotalPrice);
function calcTotalPrice(total,value){
    return total + value;
}
finalPrice.innerHTML = `$ ${totalPrice}`;
}

// REMOVE FUNCTION

function removeItem(menuId){
   const toRemoveItem = orderedItem.filter(function(menu){
    return menu.id == menuId
   })[0]
console.log(toRemoveItem)
console.log(menuId)

//    orderedItem.splice(0,1)
//    orderBox.innerHTML = orderedItem
   
}

