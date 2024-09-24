import info from "./db.js"

const data = info()
const productos = data.producto

document.addEventListener("DOMContentLoaded",()=>{
    orgnizarproductos(window.location.pathname)
})

const orgnizarproductos = (pathname) => {
    let venta = ""
    switch (pathname) {
        case "/pages/Cafes.html":
            venta = productos.filter(producto => producto.tipo === "cafe")
            console.log(venta)
            init('menus',venta)
            break;
        case "/pages/helado.html":
            venta = productos.filter(producto => producto.tipo === "bebida helada")
            console.log(venta);
            init('menus',venta)
            break;
        case "/pages/postre.html":
            venta = productos.filter(producto => producto.tipo === "postre")
            console.log(venta)
            init('menus',venta)
            break;
            case "/":
                venta = productospopulares();
                console.log(venta)
                init('populares',venta)
                console.log(productospopulares());
                break;
        default:
            break;
    }
} 

const productospopulares = () => {
   let poulares = [...productos].sort((a,b)=> b.comprados - a.comprados).slice(0,5);
   return poulares;
}

const init = (clase, products) => {
 let main_div = document.querySelector(`.${clase}`);
 products.map((product)=>{
    let div = creacioncajas(product, clase);
    main_div.appendChild(div)
 })
}

// Creacion de cajas
const creacioncajas = (producto, clase) => {
    const div = document.createElement('div');
    if(clase === "menus"){
        div.className = 'menu';
        div.innerHTML = `
        <div class="menu_info">
            <div class="menu_info_titulo">
                <h3>${producto.nombre}</h3>
                <p>L. ${producto.precio}.00</p>
            </div>
            <p class="desc">${producto.descripcion}</p>
        </div>
        <img src=${producto.imagen} alt="${producto.nombre}">
        ` 
    }
    else if(clase === "populares"){
        div.className = 'popular';
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="popular-info">
            <h3>${producto.nombre}</h3>
            <p class="desc">${producto.descripcion}</p>
            <p class="tipo">Tipo: ${producto.tipo}</p>
            <p class="precio">L. ${producto.precio}.00</p>
        </div>
        ` 
    }
    return div
}


// Funciones click
const toggle_ham = ()=>{
    const ul = document.querySelector('nav ul');
    if(ul.className === "navbar-ham" ){
        ul.classList.remove('navbar-ham');
        ul.classList.add('navbar');
    }
    else{
    ul.classList.add('navbar-ham');
    ul.classList.remove('navbar');
    }
}

const toggle_dropdown = ()=>{
    const menu = document.querySelectorAll('.navbar-item a')[1];
    const ul = document.querySelector('.dropdown');
    if(ul.style.display  === "" ){
        ul.style.display = "block";
        menu.style.backgroundColor = "#591F0B";
        menu.style.color = "white";
    }
    else{
        const responsive = document.querySelector('nav ul');
        if(responsive.className !== "navbar-ham" ){
            menu.style.backgroundColor = "#9E7418";
            menu.style.color = "black";
        }
        ul.style.display = "";
    }
}

window.toggle_dropdown = toggle_dropdown
window.toggle_ham = toggle_ham