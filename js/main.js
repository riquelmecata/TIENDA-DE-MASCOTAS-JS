let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos)
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".nav-button");
let botonesAgregar = document.querySelectorAll(".card-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {


    contenedorProductos.innerHTML = "";

// mostrar todos los productos 
    productosElegidos.forEach( producto => { // para recorrer todos los productos
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` 
            <div class="col">
                <div class="card">
                    <div class="hovericons">
                        <a href="#"><span class="material-symbols-outlined">favorite</span></a>
                    </div>
                    <img src="${producto.imagen}" alt="${producto.titulo}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">${producto.titulo}</p>
                        <h5 class="card-title">$${producto.precio.toLocaleString('es-CL')}</h5>
                        <button class="card-agregar" id="${producto.id}"> Agregar al carrito</button>
                    </div>
                </div>
            </div> 
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();

}

// creamos los filtros / categorias

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")
        if(e.currentTarget.id != "todos") {
            const productosBoton = productos.filter (producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
        }




    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".card-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
        
    });

}
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

// agregar elementos a un array (carrito)

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        destination: "../carrito.html",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#A288A6",
          color: "#ffffff"
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find (producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) { // agregamos la seccion de cantidad 

       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
  
 actualizarNumerito();
localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}
// hacemos que cambie el numerito del carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce ((acc,producto) => acc + producto.cantidad, 0);
    console.log(nuevoNumerito)
    numerito.innerText = nuevoNumerito;

}