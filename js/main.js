// creacion del array

const productos = [
    {
        id: "perro-01",
        titulo: "ACANA LIGHT & FIT PERRO",
        imagen: "./img/11.jpg",
        categoria: {
            nombre: "Perros",
            id: "perros"
        },
        precio: 48428

    },
    {
        id: "perro-02",
        titulo: "AMITY SP LOW GRAIN SALMON ADULT 4 KG",
        imagen: "./img/12.jpg",
        categoria: {
            nombre: "Perros",
            id: "perros"
        },
        precio: 18990

    },
    {
        id: "perro-03",
        titulo: "BRIT CARE SENSITIVE VENISON & POTATO",
        imagen: "./img/13.png",
        categoria: {
            nombre: "Perros",
            id: "perros"
        },
        precio: 74990

    },
    {
        id: "perro-04",
        titulo: "ROYAL CANIN MINI LIGHT 2.5 KG",
        imagen: "./img/14.jpg",
        categoria: {
            nombre: "Perros",
            id: "perros"
        },
        precio: 28500

    },
    {
        id: "gato-01",
        titulo: "NUTRIENCE GRAIN FREE CAT INDOOR 2,5 KG",
        imagen: "./img/15.jpg",
        categoria: {
            nombre: "Gatos",
            id: "gatos"
        },
        precio: 23990

    },
    {
        id: "gato-02",
        titulo: "ROYAL CANIN FELINE INDOOR 7.5 KG",
        imagen: "./img/16.png",
        categoria: {
            nombre: "Gatos",
            id: "gatos"
        },
        precio: 59000

    },
    {
        id: "gato-03",
        titulo: "BRIT CARE STERILIZED SENSITIVE",
        imagen: "./img/17.jpg",
        categoria: {
            nombre: "Gatos",
            id: "gatos"
        },
        precio: 55990

    },
    {
        id: "gato-04",
        titulo: "ACANA WILD ATLANTIC GATO 4.5 KG",
        imagen: "./img/18.png",
        categoria: {
            nombre: "Gatos",
            id: "gatos"
        },
        precio: 46150

    },
    {
        id: "exotico-01",
        titulo: "BRIT RABBIT JUNIOR",
        imagen: "./img/19.jpg",
        categoria: {
            nombre: "Exoticos",
            id: "exoticos"
        },
        precio: 17990

    },
    {
        id: "exotico-02",
        titulo: "TROPICAN MEZCLA CRIANZA 2 KG",
        imagen: "./img/20.jpg",
        categoria: {
            nombre: "Exoticos",
            id: "exoticos"
        },
        precio: 29460

    },
    {
        id: "exotico-03",
        titulo: "MAZURI AQUATIC TURTLE DIET 340 GR",
        imagen: "./img/21.jpg",
        categoria: {
            nombre: "Exoticos",
            id: "exoticos"
        },
        precio: 16080

    },
    {
        id: "exotico-04",
        titulo: "ALIMENTO PARA CONEJOS BUNNY MIX",
        imagen: "./img/22.png",
        categoria: {
            nombre: "Exoticos",
            id: "exoticos"
        },
        precio: 5490

    }
]

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
                        <h5 class="card-title">$${producto.precio}</h5>
                        <button class="card-agregar" id="${producto.id}"> Agregar al carrito</button>
                    </div>
                </div>
            </div> 
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();

}

cargarProductos(productos);

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