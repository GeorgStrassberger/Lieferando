// JSON - Version versuchen
const gerichte = [{
        "gerichtName": "Pizza Salami",
        "gerichtPreis": 8.50,
        "gerichtMenge": 1,
        "gerichtInfo": "Tomatensoße & Käse, Salami",
        "gerichtBild": "./img/pizza.png",
    },
    {
        "gerichtName": "Döner",
        "gerichtPreis": 5.00,
        "gerichtMenge": 1,
        "gerichtInfo": "Standart",
        "gerichtBild": "./img/döner.png",
    },
    {
        "gerichtName": "Hamburger",
        "gerichtPreis": 6.80,
        "gerichtMenge": 1,
        "gerichtInfo": "mit Rindfleisch, Zwiebel, Senf, Ketchup",
        "gerichtBild": "./img/burger.png",
    },
    {
        "gerichtName": "Salat",
        "gerichtPreis": 3.50,
        "gerichtMenge": 1,
        "gerichtInfo": "kleiner gemischter Salat",
        "gerichtBild": "./img/salat.png",
    },
    //#############################
    {
        "gerichtName": "Pizza Salami",
        "gerichtPreis": 8.50,
        "gerichtMenge": 1,
        "gerichtInfo": "Tomatensoße & Käse, Salami",
        "gerichtBild": "./img/pizza.png",
    },
    {
        "gerichtName": "Döner",
        "gerichtPreis": 5.00,
        "gerichtMenge": 1,
        "gerichtInfo": "Standart",
        "gerichtBild": "./img/döner.png",
    },
    {
        "gerichtName": "Hamburger",
        "gerichtPreis": 6.80,
        "gerichtMenge": 1,
        "gerichtInfo": "mit Rindfleisch, Zwiebel, Senf, Ketchup",
        "gerichtBild": "./img/burger.png",
    },
    {
        "gerichtName": "Salat",
        "gerichtPreis": 3.50,
        "gerichtMenge": 1,
        "gerichtInfo": "kleiner gemischter Salat",
        "gerichtBild": "./img/salat.png",
    },
    {
        "gerichtName": "Pizza Salami",
        "gerichtPreis": 8.50,
        "gerichtMenge": 1,
        "gerichtInfo": "Tomatensoße & Käse, Salami",
        "gerichtBild": "./img/pizza.png",
    },
    {
        "gerichtName": "Döner",
        "gerichtPreis": 5.00,
        "gerichtMenge": 1,
        "gerichtInfo": "Standart",
        "gerichtBild": "./img/döner.png",
    },
    {
        "gerichtName": "Hamburger",
        "gerichtPreis": 6.80,
        "gerichtMenge": 1,
        "gerichtInfo": "mit Rindfleisch, Zwiebel, Senf, Ketchup",
        "gerichtBild": "./img/burger.png",
    },
    {
        "gerichtName": "Salat",
        "gerichtPreis": 3.50,
        "gerichtMenge": 1,
        "gerichtInfo": "kleiner gemischter Salat",
        "gerichtBild": "./img/salat.png",
    },
];
// Array zum befüllen  für den Warenkorb
let warenNamen = [];
let warenPreis = [];
let warenMenge = [];
let warenBild = [];

// Globale Variablen
let aktuellesGericht = 0;
let menge = 1;
let isLiked = false;


// Render Function für die Seite duch onload im Body
function init() {
    gerichteImFensterEinfügen();
    toggelButton();
};

// Auf der Seite die Gerichte Auswahl einfügen
function gerichteImFensterEinfügen() {
    document.getElementById('accordionExample').innerHTML = ``;
    for (let i = 0; i < gerichte.length; i++) {
        const gerichtName = gerichte[i]['gerichtName'];
        const gerichtPreis = gerichte[i]['gerichtPreis'];
        const gerichtBild = gerichte[i]['gerichtBild'];
        const gerichtMenge = gerichte[i]['gerichtMenge'];
        const gerichtInfo = gerichte[i]['gerichtInfo'];
        document.getElementById('accordionExample').innerHTML += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${i}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        <img src="${gerichtBild}" style="margin-left: 16px; margin-right: 16px;" alt="+">
                        <span><strong>${gerichtName}</strong></span>
                    </button>
                </h2>
                <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="accordion-child">
                            <span><strong>Info: </strong>${gerichtInfo}</span>
                            <span><strong>Preis: </strong>${gerichtPreis.toFixed(2)} €</span>                        
                        </div>
                        <img src="./img/plus-black-64.png" onclick="wareZumNeuenArrayHinzufügen(${i})" alt="+" width="48px" height="48px">
                    </div>
                </div>
            </div>                  
        `;
    }
}


function inWarenkorbEinfügen() {
    document.getElementById('cart').innerHTML = ``;
    let sum = 0;

    for (let i = 0; i < warenNamen.length; i++) {
        const Preis = warenPreis[i];
        const Menge = warenMenge[i];
        const Name = warenNamen[i];
        const PreisMenge = Preis * Menge;
        sum = sum + PreisMenge;
        hideEmptyCart();
        showCartMinOrder();
        showPaytn();
        showCartBill();
        document.getElementById('cart').innerHTML += `
        <div id="cart${i}" class="cart">
            <div class="cart-info-1">
                <div>
                    <span>${Menge}</span>
                    <span>${Name}</span>
                </div>
                <span>${PreisMenge.toFixed(2)} €</span>
            </div>
            <div class="cart-info-2">
                <span>
                    <strong>Anmerkung hinzufügen</strong>
                </span>
                <div class="cart-btn">
                    <img onclick="mengeMinusEins(${i})" src="./img/minus-black-16.png" alt="-">
                    <img onclick="mengePlusEins(${i})" src="./img/plus-black-16.png" alt="+">
                </div>
            </div>
        </div>
        `;
    }
    showCartCalculation(sum);
}

//Rechnungsfenster 
function showCartCalculation(sum) {
    showSubTotalPrice(sum);
    showtotalPrice(sum);
    minOrderPrice(sum);
    showTotalPriceMediaBtn(sum);
}

function showSubTotalPrice(sum) {
    document.getElementById('subtotal-price').innerHTML = `
    ${sum.toFixed(2)} €    
    `;
}

function showtotalPrice(sum) {
    document.getElementById('total-price').innerHTML = `${sum.toFixed(2)} €`;
    document.getElementById('pay-btn').innerHTML = `
    <button id="btn" onclick="openCart()">Bezahlen (${sum.toFixed(2)} €)</button>
    `;
}

function showTotalPriceMediaBtn(sum) {
    document.getElementById('media-btn').innerHTML = `
    Bezahlen (${sum.toFixed(2)} €)
    `;

}

function minOrderPrice(sum) {
    let minOrderPrice = 12.5;
    let orderDiverenc = minOrderPrice - sum;
    document.getElementById('cart-min-order-price').innerHTML = `
    <div>Benötigter Betrag, um den Mindestbestellwert zu erreichen</div>
    <span>${orderDiverenc.toFixed(2)} €</span>
    `;
    if (orderDiverenc <= 0) {
        aktivePayBtn();
        document.getElementById('cart-min-order').classList.add('d-none');
    }
    // document.getElementById('warenkorb').disabled = true;
}

// Die Gericht in den WarenkorbARRAY schicken
function wareZumNeuenArrayHinzufügen(x) {
    let includ = gerichte[x]['gerichtName'];
    if (warenNamen.includes(includ)) {
        let position = warenNamen.indexOf(includ);
        warenMenge[position]++;
        if (warenMenge[position] >= 11) {
            alert('Du hast die Maximale Menge erreicht!');
            warenMenge[position] = 10;
        }
    } else {
        warenNamen.push(gerichte[x]['gerichtName']);
        warenPreis.push(gerichte[x]['gerichtPreis']);
        warenMenge.push(gerichte[x]['gerichtMenge']);
        warenBild.push(gerichte[x]['gerichtBild']);
    }
    inWarenkorbEinfügen();
}

function hideEmptyCart() {
    document.getElementById('cart-empty').classList.add('d-none');
}

function showEmptyCart() {
    document.getElementById('cart-empty').classList.remove('d-none');
}

function ausWarenkorbEntfernen(s) {
    warenNamen.splice(s, 1);
    warenPreis.splice(s, 1);
    warenMenge.splice(s, 1);
    warenBild.splice(s, 1);
    inWarenkorbEinfügen();
}
// Die Stückzahl im Warenkorb um 1 erhöhen.
function mengePlusEins(i) {
    console.log('plus bei i: ' + i);
    warenMenge[i]++;
    if (warenMenge[i] >= 11) {
        alert('Du hast die Maximale Menge erreicht!');
        warenMenge[position] = 10;
    }
    inWarenkorbEinfügen();
}
// Die Stückzahl im Warenkorb um 1 reduzieren und bei 0 löschen.
function mengeMinusEins(k) {
    warenMenge[k]--;
    if (warenMenge[k] < 1) {
        ausWarenkorbEntfernen(k);
        showEmptyCart();
        hideCartMinOrder();
        hidePayBtn();
        hideCartBill();
    }
    inWarenkorbEinfügen();
}


function showCartMinOrder() {
    document.getElementById('cart-min-order').classList.remove('d-none');
}

function hideCartMinOrder() {
    document.getElementById('cart-min-order').classList.add('d-none');
}

function showPaytn() {
    document.getElementById('pay-btn').classList.remove('d-none');
}

function hidePayBtn() {
    document.getElementById('pay-btn').classList.add('d-none');
}

function aktivePayBtn() {
    document.getElementById('btn').classList.add('btn-active');
    //  document.getElementById('warenkorb').disabled = false;
    // den BTN noch inactiv mit dem style setzten wie im quiz app
}

function inactivePayBtn() {
    document.getElementById('pay-btn').firstElementChild.classList.remove('btn-active');
}

function showCartBill() {
    document.getElementById('cart-bill').classList.remove('d-none');
}

function hideCartBill() {
    document.getElementById('cart-bill').classList.add('d-none');
}

function openCart() {
    console.log('Butten wurde geklickt');
    window.open('cart.html');
}


function likeHeart() {
    isLiked = !isLiked;
    if (isLiked) {
        document.getElementById('heart').src = `./img/heart-69-24.png`;
    } else {
        document.getElementById('heart').src = `./img/favorite-3-24-orange.png`;
    }
}

// Scrollbar
window.onscroll = function() {
    let shoppingCart = document.getElementById('shopping-cart-frame');
    if (window.scrollY > 100) {
        shoppingCart.classList.add('shopping-position');
        //shoppingCart.style = `top: 0`;
    } else {
        shoppingCart.classList.remove('shopping-position');
        //shoppingCart.style = `top: 100px`;
    }
}

function toggelButton() {
    let mediaBtn = document.getElementById('botten-btn');
    if (window.innerWidth < 1024) {
        mediaBtn.classList.remove('d-none');
    } else {
        mediaBtn.classList.add('d-none');
    }
}