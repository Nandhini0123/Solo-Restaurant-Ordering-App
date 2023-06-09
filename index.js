import { menuArray } from '/data.js'
const menuCard = document.getElementById("menu-card")
const orderBox = document.getElementById("order-box")
let finalPrice = document.getElementById("final-price")
let priceOfEach = [];
let orderedItem = [];
let idOfItem =  [];
let totalPrice  = '';
let x;

// To display menu

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
   document.getElementById("total").style.display="flex";
   document.getElementById("purchase-btn").style.display="block";
   document.getElementById("alert-msg").innerHTML = " ";
   document.getElementById("order-msg-box").style.visibility="hidden";
 }
 else if(e.target.dataset.remove){
   removeItem(e.target.dataset.remove)
 }
 else if(e.target.id === 'purchase-btn'){
    paymentWindow()
 }
})

//Order Confirmation Message//
const formId = document.getElementById("form-id");
formId.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("modal").style.visibility="hidden";
    orderBox.innerHTML = '';
    document.getElementById("order-heading").style.display="none";
    document.getElementById("total").style.display="none";
    document.getElementById("purchase-btn").style.display="none";
    document.getElementById("order-msg-box").style.visibility="visible";
    // ORDER MSG
    const orderMsg = document.getElementById("order-msg");
    orderMsg.innerHTML = 'Thank You , your order is on the way';
})

//  FUNCTION TO DISPLAY ADDED ITEMS

function yourOrderBox(menuId){
    const selectedItem = menuArray.filter(function(menu){
        return menu.id == menuId
    })[0]
    let addItem =' ';
    addItem = `<div class="item-name-price">
                        <div class="item-name-remove">
                        <p class="item-name">${selectedItem.name}</p>
                        <p id="remove-item-btn" data-remove="${selectedItem.id}">remove</p>
                        </div>
                        <p id="price-selected-item">$ ${selectedItem.price}</p>
                   </div>`;
    orderedItem.push(addItem)
    priceOfEach.push(selectedItem.price)
    idOfItem.push(selectedItem.id);
    orderBox.innerHTML = orderedItem
    totalPriceCalc()

}

//UPDATE REMOVED ITEMS AND UPDATED TOTAL PRICE

function update(){
    orderedItem.splice(x, 1);
    idOfItem.splice(x, 1);
    orderBox.innerHTML = orderedItem;
    priceOfEach.splice(x, 1);
    totalPriceCalc();
}
// REMOVE FUNCTION

function removeItem(menuId){
   const toRemoveItem = orderedItem.filter(function(menu){
    return menu.id == menuId
   })[0]
x = idOfItem.indexOf(Number(menuId));
update();
  
}

// FUNCTION TO CALCULATE TOTAL PRICE

function totalPriceCalc(){ 
    if(priceOfEach.length){
    totalPrice = priceOfEach.reduce(calcTotalPrice);
    function calcTotalPrice(total,value){
        return total + value;
    }}
    else {
        totalPrice = 0;
    }
    finalPrice.innerHTML = `$ ${totalPrice}`;
    } 

//FUNCTION TO DISPLAY PAYMENTWINDOW

function paymentWindow(){
    if(orderedItem.length) {
    document.getElementById("modal").style.visibility="visible";
    }
    else {
        document.getElementById("order-msg-box").style.visibility="visible";
        document.getElementById("alert-msg").innerHTML = "Your Cart is empty. Please add items";
        document.getElementById("order-msg").innerHTML = " ";
    }
}

