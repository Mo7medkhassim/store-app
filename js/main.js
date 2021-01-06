// navbar 

const cartBtn = document.querySelector(".cart-btn");
const cartBtnI = document.querySelector(".cart-btn span i");
const cartinfo = document.querySelector(".cart-info");
const cartTotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");
const bannerBtn = document.querySelector(".banner-btn");
const cartOverly = document.querySelector(".cart-overly");
const cartContent = document.querySelector(".cart-Content");
const cartContents = document.querySelector(".cart-contents");
const chechOutBtn = document.querySelector(".chech-out");
const closeCartBtn = document.querySelector(".close-cart");
const clearItemBtn = document.querySelector(".clear-item");
const modalContent = document.querySelector(".modal-content");
const productItem = document.querySelector(".prodct-item");

console.log(modalContent);

// cart
let cart = [];

// button
let buttonsDOM = [];
let searchDom = [];

// getting product
class Products {
    async getProduct() {
        try {
            let result = await fetch('products.json')
            let data = await result.json();
            let product = data.items;
            product = product.map((el) => {
                let { title, price , category} = el.fields;
                let { id } = el.sys;
                let img = el.fields.image.fields.file.url;

                return { title, price, id, category, img };

            })
            return product;
        } catch (err) {
            console.log(err);
        }

    }
}

// display products
class UI {    
    displayProduct(product) {
        let result = "";
        product.forEach(el => {
            result += `
            <div class="col- col-md-4 my-2 " data-aos="zoom-in">
            <div class="product-content"  >
            <img class="img" src="${el.img}" alt="">
            <div class="product-icon">
                <button type="button" href="" data-toggle="modal" data-target="#exampleModal" class="search-product pro-icon">
                    <i class="fas fa-search" ></i>
                </button>
                <button class="cart-product  pro-icon" data-id=${el.id}>
                    <i class="fas fa-shopping-cart">

                    </i>
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
    }
    getAllSearch(){
        const searchBtnDom = [...document.querySelectorAll(".search-product")];
        searchDom = searchBtnDom;
        searchDom.forEach(button => {
            button.addEventListener("click", (e) => {  
                let id = e.target.parentElement.nextElementSibling.dataset.id;
               
                //     cart.forEach(el => {
                  
                  
            //   });
            })
          

        })
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
    // moddalItem(item){
    //     const div = document.createElement('div');
        
    //     div.innerHTML = `
    //         <div class="">
    //             <div class="img">
    //                 <img src=${item.img} alt="">
    //             </div>
    //         </div>
    //         <div class=" cart-info">
    //             <h4>${item.title}</h4>
    //             <h5>$${item.price}</h5>
    //             <span class="remove-item" data-id=${item.id}>remove</span>
    //         </div>
    //         <div class=" item-conut">
    //             <button class="fas fa-chevron-up"  data-id=${item.id}></button>
    //             <p class="text-center">${item.amount}</p>
    //             <button class="fas fa-chevron-down"  data-id=${item.id}></button>
    //         </div>
    //      `;
        
    //     modalContent.appendChild(div);
    // }
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
        // modalContent.appendChild(div);
        // console.log(item);
        
        
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
    
    let products = new Products();
    let ui = new UI();
    // setup App
    ui.setupAPP();
    
    // get all product
    products.getProduct().then(data => {
        ui.displayProduct(data);
        storage.saveProduct(data);
    }).then(() => {
        ui.getAllBtn();
        ui.getAllSearch();
        ui.cartLogic(); 
    });
});

// product page
// filter items

// const filterBtn = document.querySelectorAll(".filter-btn");
// filterBtn.forEach((btn) => {
//     btn.addEventListener("click", function(e) {
//         const category = e.currentTarget.dataset.id;
//         const menuCategory = product.filter((item) => {

//         })
        
//    })
// })












