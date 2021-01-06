
window.onscroll = function () { myNavbar() };

// Varibles
const linksActive = document.querySelectorAll(".links a");

const navbar = document.querySelector(".navbar");
// console.log(cartBtnI);
// sticky navbar
linksActive.forEach(el => {
    
    el.addEventListener("click", function(e){
       
        // e.preventDefault();
        console.log(e.target);
        
        e.target.classList.add('active');

    })
})
const sticky = navbar.offsetTop + 56;
function myNavbar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        
        // cartBtnI.classList.add("cart-color")
    } else {
        navbar.classList.remove("sticky");

        // cartBtnI.classList.remove("cart-color")
    }
}

// nav toggle 
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function(){
    links.classList.toggle("show-links")
    // console.log(links);
})
