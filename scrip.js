const initSlider=()=>{
    const imageList=document.querySelector(".slider-wrapper .image-list");
    const slideButtons=document.querySelectorAll(".slider-wrapper .slide-button");
    const maxScrollLeft=imageList.scrollWidth-imageList.clientWidth;

    /*SALON 2*/ 
    slideButtons.forEach(button => {
        button.addEventListener("click",()=>{
            const direction=button.id==="prev-slide"?-1:1;
            const scrollAmount=imageList.clientWidth*direction;
            imageList.scrollBy({ left:scrollAmount,behavior:"smooth"});
        });
    });
    const handleSlideButtons=()=>{
        slideButtons[0].style.display=imageList.scrollLeft<=0? "none":"block";
        slideButtons[1].style.display=imageList.scrollLeft>=maxScrollLeft? "none":"block";
    }
    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
    });
    
}

window.addEventListener("load",initSlider);


//carrito
const carrito =document.getElementById('carrito');
const elemento1 =document.getElementById('lista-1');
const elemento2 =document.getElementById('lista-2');
const lista=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.getElementById('vaciar-carrito');

cargarEventListeners()

function cargarEventListeners(){
    elemento1.addEventListener('click', comprarElemento);
    elemento2.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);

    vaciarCarritoBtn.addEventListener('click',vaciarCarrito)
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento=e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen:elemento.querySelector('img').src,
        titulo:elemento.querySelector('h5').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id:elemento.querySelector('a').getAttribute('data-ic')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    const row=document.createElement('tr');
    row.innerHTML=`
    <td> 
        <img src="${elemento.imagen}" width=100>
    </td>
    <td> 
        ${elemento.titulo}
    </td>
    <td> 
    ${elemento.precio}
    </td>
    <td> 
        <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td>
    `;

    lista.appendChild(row);
}

function eliminarElemento(e){
    e.preventDefault();
    let elemento,
    elementoid;

    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento=e.target.parentElement.parentElement;
        elementoid=elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
}