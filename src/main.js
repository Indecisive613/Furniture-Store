let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

function getQuantity(id){ //returns the number of the items defined by id within the basket
    for(product of basket){
        if(product.id === id){
            return product.item;
        }
    }
    return 0;
}

function createShopItem(x){ //creates a shop panel for object x from the array shopItemsData
    return `<div class="item">
        <img width="221" src=${x.img} alt="">
        <div id=product-id-${x.id} class="details">
            <h3>${x.name}</h3>
            <p>${x.desc}</p>
            <div class="price-quantity">
                <h2>${x.price}</h2>
                <div class="button">
                    <i onclick="decrement(${x.id})" class="fa-solid fa-minus"></i>
                    <div id=${x.id} class="quantity">${getQuantity(x.id)}</div>
                    <i onclick="increment(${x.id})" class="fa-solid fa-plus"></i>
                </div>
            </div>
        </div>
    </div>
    `
}

function createShop(){ //creates the shop
    shop.innerHTML = shopItemsData.map(createShopItem).join("");
}

createShop();

function getBasketItem(id){ //returns the object referenced to by id
    for(product of basket){
        if(product.id === id){
            return product;
        }
    }
    return undefined;
}

function increment(id){ //increases the item count in the basket for the item defined by id
    let selectedItemID = id.id;
    let search = getBasketItem(selectedItemID);
    if(search === undefined){
        basket.push({
            id: selectedItemID,
            item: 1
        });
    } else{
        search.item += 1;
    }
    update(selectedItemID);
}

function decrement(id){ //decreases the item count in the basket for the item defined by id
    let selectedItemID = id.id; 
    let search = getBasketItem(selectedItemID);

    if(search === undefined){
        return;
    } else{
        search.item -= 1;
        update(selectedItemID);
    }
}

function displayTotal(){ //displays the total number of items in the basket
    total = 0;
    for(x of basket){
        total += x.item;
    }
    document.getElementById("grandTotal").innerHTML = total;
}
displayTotal();

function itemInBasket(x){//returns true if the item is in the basket (not 0)
    return x.item;
}

function update(id){ //updates the item count on screen for the item defined by id
    let itemCount = getQuantity(id);
    document.getElementById(id).innerHTML = itemCount; //adjusts count on the individual item
    displayTotal(); 

    basket = basket.filter(itemInBasket); //filtering all items in the basket that are zero
    localStorage.setItem("data", JSON.stringify(basket));
}