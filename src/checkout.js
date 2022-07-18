let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

function displayTotal(){ //displays the total number of items in the basket
    total = 0;
    for(x of basket){
        total += x.item;
    }
    document.getElementById("grandTotal").innerHTML = total;
}
displayTotal();

function getItemData(id){ //returns the object referenced to by id
    for(product of shopItemsData){
        if(product.id === id){
            return product;
        }
    }
    return undefined;
}

function generateCartItem(basketItem){ //generates a cart panel for object x from the array shopItemsData
    let selectedItemID = basketItem.id;
    let product = getItemData(basketItem.id);
    return `
    <div class="cart-item">
        <div class="image-box">
            <img src=${product.img} alt="Image"/>
        </div>
        <div class="details">

            <div class="title-price-x">
                <h2 class="title-price">
                    <p>${product.name}</p>
                    <p class="cart-item-price">${product.price}</p>
                </h2>
                <i onclick="removeItem(${selectedItemID})" class="fa-solid fa-x"></i>
            </div>

            <div class="button">
                <i onclick="decrement(${selectedItemID})" class="fa-solid fa-minus"></i>
                <div id=${selectedItemID} class="quantity">${getQuantity(selectedItemID)}</div>
                <i onclick="increment(${selectedItemID})" class="fa-solid fa-plus"></i>
            </div>
            
            <h3>$ ${getQuantity(selectedItemID)* getCost(selectedItemID)}</h3>
        </div>
    </div>
    `
}

function generateCart(){ //creates the cart
    if(basket.length !== 0){
        ShoppingCart.innerHTML = basket.map(generateCartItem).join("");
    } else{
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>
        `
    }
}

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
    generateCart();
}

function decrement(id){ //decreases the item count in the basket for the item defined by id
    let selectedItemID = id.id;
    let search = getBasketItem(selectedItemID);

    if(search === undefined){
        return;
    } else{
        search.item -= 1;
        update(selectedItemID);
        generateCart();
    }
}

function itemInBasket(x){//returns true if the item is in the basket (not 0)
    return x.item;
}

function getQuantity(id){ //returns the number of the items defined by id within the basket
    for(product of basket){
        if(product.id === id){
            return product.item;
        }
    }
    return 0;
}

function update(id){ //updates the item count on screen for the item defined by id
    let itemCount = getQuantity(id);
    document.getElementById(id).innerHTML = itemCount; //adjusts count on the individual item
    displayTotal();
    finalAmount(); 

    basket = basket.filter(itemInBasket); //filtering all items in the basket that are zero
    localStorage.setItem("data", JSON.stringify(basket));
}

function removeItem(id){ //removes the item defined by id from the basket
    let selectedItemID = id.id;
    let newBasket = [];
    for(product of basket){
        if(product.id !== selectedItemID){
            newBasket.push(product)
        }
    }
    basket = newBasket;
    displayTotal();
    finalAmount();
    generateCart();
    localStorage.setItem("data", JSON.stringify(basket));
}

function getCost(id){ //returns the price
    for(product of shopItemsData){
        if(product.id === id){
            return product.price.slice(1);
        }
    }
}

function finalAmount(){ //generates the final cost
    let amount = 0;
    for(product of basket){
        amount += product.item * getCost(product.id);
    }
    label.innerHTML = `
        <h1>Total Bill = $${amount}</h1>
        <button onclick="thankYou()" class="checkout">Checkout</button>
        <button onclick="clearAll()" class="removeAll">Clear Cart</button>
    `
}
finalAmount();

function clearAll(){ //clears basket
    basket = [];
    generateCart();
    displayTotal();
    localStorage.setItem("data", JSON.stringify(basket));
}

function thankYou(){ //clears basket and generates a thank you message
    clearAll();
    label.innerHTML = `
        <h1>Thank you for your business!</h1>
        <h3>Have a nice day.</h3>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>
    `
}

generateCart();