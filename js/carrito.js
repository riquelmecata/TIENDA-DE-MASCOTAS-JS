let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito); // mantener productos en el storage

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-borrar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {

    if(productosEnCarrito && productosEnCarrito.length > 0) {      
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.innerHTML = `
            <div class="row align-items-center justify-content-between carrito-producto">
                <div class="col">
                    <img src="${producto.imagen}" alt="${producto.titulo}" class="carrito-producto-imagen">
                </div>
                <div class="col nombre-producto">
                    <small>Nombre</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="col cantidad-producto">
                    <small>Cantidad</small>
                    <h3>${producto.cantidad}</h3>
                </div>
                <div class="col precio-producto">
                    <small>Precio</small>
                    <h3>$${producto.precio}</h3>
                </div>
                <div class="col subtotal-producto">
                    <small>Subtotal</small>
                    <h3>$${producto.precio * producto.cantidad}</h3>
                </div>
                <div class="col-auto eliminar-producto">
                    <button class="carrito-producto-borrar" id="${producto.id}"><span class="material-symbols-outlined">delete</span></button>
                </div>
                
            </div>
            `;
            
            contenedorCarritoProductos.append(div);
    
    
    
        })
        
        
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    }



    actualizarBotonesEliminar();
    actualizarTotal();
}


cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-borrar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

 function eliminarDelCarrito(e) {
    let idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
 }

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}