
// // navbar 
// window.onscroll = function () { myNavbar() };

// // Varibles

// const navbar = document.querySelector(".navbar");
const cartBtn = document.querySelector(".cart-btn");
const cartOverly = document.querySelector(".cart-overly");
const cartContents = document.querySelector(".cart-contents");
const cartContent = document.querySelector(".cart-Content");
// const navToggle = document.querySelector(".nav-toggle");
const bannerBtn = document.querySelector(".banner-btn");
const closeCartBtn = document.querySelector(".close-cart");
const cartinfo = document.querySelector(".cart-info");
const productItem = document.querySelector(".prodct-item");
const cartTotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");
const chechOutBtn = document.querySelector(".chech-out");
const clearItemBtn = document.querySelector(".clear-item");
const cartBtnI = document.querySelector(".cart-btn span i");
const pages = document.querySelector(".pages");
// console.log(pages);
// sticky navbar
// const sticky = navbar.offsetTop + 56;
// function myNavbar() {
//     if (window.pageYOffset >= sticky) {
//         navbar.classList.add("sticky");
//         cartBtnI.classList.add("cart-color")
//     } else {
//         navbar.classList.remove("sticky");
//         cartBtnI.classList.remove("cart-color")
//     }
// }
// cart
let cart = [];

// button
let buttonsDOM = [];

// getting product
class Products {
    async getProduct() {
        try {
            let result = await fetch('products.json')
            let data = await result.json();
            let product = data.items;
            product = product.map((el) => {
                let { title, price, category } = el.fields;
                let { id } = el.sys;
                let img = el.fields.image.fields.file.url;

                return { title, price, id, category, img };

            });


            return product;
        } catch (err) {
            console.log(err);
        }
        
    }
}


const filterBtn = document.querySelectorAll(".filter-btn");
class Paj {
    pagiR(product){
    let items = $(".item");
    let numberItem = product.length;
    let perPageItem = 6;
    let pageNumber =Math.ceil(numberItem / perPageItem);
    let url = new URL(window.location.href);
    let curentPage = url.searchParams.get("pages");
    
    for (let i = 1; i <= pageNumber; i++) {
        let links = document.createElement("a");
        let text = document.createTextNode(i);
        links.classList.add("pagiy");
        links.appendChild(text);
        pages.appendChild(links);
        links.href = url.pathname + "?pages="+ i;
    }
    
    let startIndex = (curentPage - 1) * perPageItem;
    let lastIndex;
    if (pageNumber == curentPage) {
        lastIndex = numberItem -1;
        // console.log(123);
        
    }else{
         lastIndex = startIndex + perPageItem -1;

    }
  
    for (let j = startIndex; j <= lastIndex; j++) {
        
        console.log(product[j]);
        
        
    }
    return product;
    
}

}
// console.log(product);       
// display products
class UI {
    

    // filterr(product) {
    //     filterBtn.forEach((btn) => {
    //         btn.addEventListener("click",function(e) {
    //             console.log(product);
            
    //             const btnDom = e.currentTarget.dataset.id;
    //             const itemCa = product.filter(item =>{
    //                 if(item.category === btnDom){
                        
    //                     return item;
    //                 }
                    
                    
    //             })
    //             if(btnDom === "all"){
    //                 displayProduct(product);
    //                 return product;
    //             }else{
    //                 displayProduct(itemCa);
    //                 return itemCa;

    //             }
                    
    //             }
    //         )
    //     });
    //     return filterBtn;
    // }
    
    displayProduct(product) {
        let result = "";
        product.forEach(el => {
            result += `
            <div class="item col- col-md-4 my-2 ${el.category} " 
           
             >
            <div class="product-content "  >
            <img class="img" src="${el.img}" alt="">
            <div class="product-icon">
            <a href="" class="search-product pro-icon">
            <i class="fas fa-search"></i>
            </a>
                <button class="cart-product  pro-icon" data-id=${el.id}>
                <i class="fas fa-shopping-cart"></i>
                </button>
                </div>
                </div>
                
                <div class="footer-product">
                <p>${el.title}</p>
                <h4>$${el.price}</h4>
                </div>
                </div>`;
        });
        productItem.innerHTML = result;
        // console.log(product);
      
        return product;
    
    }

    getAllBtn() {
        const cartBtnDom = [...document.querySelectorAll(".cart-product")];

        buttonsDOM = cartBtnDom;
        cartBtnDom.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.disabled = true;
            }
            button.addEventListener('click', (e) => {
                button.style.color = "lightgreen";

                button.disabled = true;
                // get product from products
                let cartItem = { ...storage.getProduct(id), amount: 1 };
                // add product to the cart
                cart = [...cart, cartItem];


                // save cart in local storage
                storage.saveCart(cart);
                // set cart value in new method
                this.setCartValue(cart);
                // display cart items
                this.addCartItem(cartItem);
                // show cart in Dom
                this.showCart();
                // filter

            })
        })
    }
    setCartValue(cart) {
        let tempTotal = 0;
        let itemTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemTotal;




    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <div class="">
             <div class="img">
                 <img src=${item.img} alt="">

             </div>
        </div>
        <div class=" cart-info">
                <h4>${item.title}</h4>
                <h5>$${item.price}</h5>
                 <span class="remove-item" data-id=${item.id}>remove</span>
        </div>
        <div class=" item-conut">
            <button class="fas fa-chevron-up"  data-id=${item.id}></button>
            <p class="text-center">${item.amount}</p>
            <button class="fas fa-chevron-down"  data-id=${item.id}></button>
        </div>
        `;
        cartContent.appendChild(div);
    }
    showCart() {
        cartOverly.classList.add('cart-visibiltiy');
        cartContents.classList.add('show-cart');
    }
    setupAPP() {
        cart = storage.getCart();
        this.setCartValue(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hideCart);
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    hideCart() {
        cartOverly.classList.remove('cart-visibiltiy');
        cartContents.classList.remove('show-cart');
    }
    cartLogic() {
        chechOutBtn.addEventListener('click', () => {
            this.chechOut()
        })
        // remove cart item
        clearItemBtn.addEventListener('click', () => {
            this.clearCart();
        })
        // remove cart functionality
        // event pupling
        cartContent.addEventListener('click', event => {
            if (event.target.classList.contains("remove-item")) {
                let removeItem = event.target;
                cartContent.removeChild(removeItem.parentElement.parentElement)

                let id = removeItem.dataset.id;
            } else if (event.target.classList.contains
                ('fa-chevron-up')) {
                let addamount = event.target;
                let id = addamount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                storage.saveCart(cart);
                this.setCartValue(cart);
                addamount.nextElementSibling.innerText =
                    tempItem.amount;

            } else if (event.target.classList.contains
                ('fa-chevron-down')) {
                let loweramount = event.target;
                let id = loweramount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    storage.saveCart(cart);
                    this.setCartValue(cart);
                    loweramount.previousElementSibling.innerText =
                        tempItem.amount;
                } else {
                    cartContent.removeChild(loweramount.parentElement.parentElement);
                    this.removeItem(id);
                }


                console.log(cart);
            }
        });
    }
    chechOut() {
        // let cartItem = cart.map(item => item.id);
    }
    clearCart() {
        let cartItems = cart.map(item => item.id)
        cartItems.forEach(id => this.removeItem(id))
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
            console.log(cartContent);
        }
        this.hideCart();
    }
    removeItem(id) {
        cart = cart.filter(item => item.id !== id);

        this.setCartValue(cart);
        storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.style.color = 'white';
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

// filter products

// local storage product
class storage {
    static saveProduct(data) {
        localStorage.setItem('product', JSON.stringify(data))

    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('product'));
        return products.find(items => items.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // alert( "welcome jqurey");

    let products = new Products();
    let paj = new Paj();
    let ui = new UI();
    // setup App
    ui.setupAPP();
    
  
    // get all product
    products.getProduct().then(data => {
        // displayProduct(data);
        // paj.pagiR(data)
        // .then(function(data) {
        ui.displayProduct(data);
        //     //  storage.saveProduct(data);

        //  })
      
        // ui.pagi(data);
        // pagi();
    }).then(() => {
        ui.getAllBtn();
        ui.cartLogic();
    });
     
    // let l = $(".filter-btn");
    // if(l == "all"){
    //     $(l).addClass("active");
    //     console.log(l);
    // }
    // filter logic
    $(".filter-btn").click(function(){
        let varr = $(this).attr("data-id");
        $(".filter-btn").removeClass("active");
		$(this).addClass("active");
        $(".item").hide();
        if(varr == "sofa"){
            $("." + varr).show();
        }else if(varr == "chairs"){
           $("." + varr).show();
        }
        else if(varr == "seat"){
            $("." + varr).show();
         }else if(varr == "bedroom"){
            $("." + varr).show();
         }
         else if(varr == "all"){
            $(".item").show();
         }
        
    })


    // 
   
});





// filter items










