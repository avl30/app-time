//Variables y Constantes
let grados = 273.15  
let ciudad;
let imagenes= [];
let temperatura
let result
const principal= document.querySelector("#principal");
const formulario= document.querySelector("#form");
const header= document.querySelector("header");

const tempMin= document.querySelector("#tempMin");
let minima= document.createElement("div")
let maxima= document.createElement("div")
let humedades= document.createElement("div")
const tempMax= document.querySelector("#tempMax");
const humedo= document.querySelector("#humedad");

//evento
formulario.addEventListener("submit", consultarApi)
tempMin.addEventListener("click",()=>minTemp(result))
tempMax.addEventListener("click",()=>maxTemp(result))
humedo.addEventListener("click",()=>humedad(result))




// funciones
function consultarApi(e) {
    e.preventDefault()

    const pais = document.querySelector("#pais").value;
      ciudad= document.querySelector("#ciudad").value;

    // validando formulario
    if(pais==="" || ciudad===""){
        mensaje("Todos los campos deben estar completos")
        return
    }

    


    Api(ciudad, pais)
    

}



//consultando api
function Api(ciudad, pais) {
    const apiID = "37af7fcf4cf300cbff110d5160acfe14";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiID}`;
  
 
    fetch(url)
       .then(respuesta=>respuesta.json())
       .then(resultado=>{
           result = resultado
           mostrar(result)
       })
       
    
}

function mostrar(result){ 
     
    if(result.cod==="404"){
        mensaje("La ciudad no es correcta")
        return

    } 

    const opciones=document.querySelector(".opciones")
    opciones.style.display= "flex"

    formulario.reset()
     console.log(result);
     const{main:{temp}, weather}=result;
     

     
     
     //console.log(temp_min);
     //console.log(temp_max);
     //console.log(weather[0]);
     const{icon}=weather[0]
     //console.log(icon);
     obtenerIcon(icon);
    limpiar()

    // mostrando  nombre de la ciudad
    const nombre= document.createElement("div");
    nombre.classList.add("principal");
    nombre.textContent= ciudad;

    // mostrando el icono de localizacion
    const gpsIcon= document.createElement("img")
    gpsIcon.classList.add("localizacion")
    gpsIcon.src= "../images/baseline_room_black_24dp.png"
    nombre.append(gpsIcon);
    principal.appendChild(nombre)
     
    // mostrando temperatuara
    
    temperatura=document.createElement("div");
    temperatura.classList.add("temperatura")
    temperatura.innerHTML= `${parseInt(temp - grados)}&#176;`;
    principal.appendChild(temperatura)
    
    // extrayendo la direccion del icono

    //console.log(imagenes[0]);
    const{src}=imagenes[0]
    //console.log(src);

    //mostrando el icono
    const iconos= document.createElement("img")
    iconos.src= src
    temperatura.insertBefore(iconos, temperatura.firstChild)
    
}

// temperatura minima
 function minTemp(r) {
    const{main:{temp_min}}=r
     if(temperatura && maxima && humedades){
         temperatura.remove()
         maxima.remove()
         humedades.remove()

         minima.classList.add("temperatura")
         minima.innerHTML=`${parseInt(temp_min - grados)}&#176;`
         principal.appendChild(minima)
     }
 }

// temperatura máxima
 function maxTemp(r) {
    const{main:{temp_max}}=r
     if(temperatura && minima && humedades){
         temperatura.remove()
         minima.remove()
         humedades.remove()
         humedo.style.color= "var(--segundoColor)"
         maxima.classList.add("temperatura")
         maxima.innerHTML=`${parseInt(temp_max - grados)}&#176;`
         principal.appendChild(maxima)
     }
     
 }

// humedad
 function humedad(r) {
    const{main:{humidity}}=r 
      if (temperatura && minima && maxima) {
          temperatura.remove()
          minima.remove()
          maxima.remove()
          humedo.style.color="yellow"
          humedades.classList.add("temperatura")
          humedades.textContent=humidity 
         
         principal.appendChild(humedades)
          
      }
     
 }




// obtener icono
function obtenerIcon(icon) {

    const imagen={
        src:`http://openweathermap.org/img/wn/${icon}@2x.png`,
    }
    
    imagenes=[imagen]
    //console.log(imagenes);
}


//mensaje alerta
function mensaje(m) {
    const existe =document.querySelector(".existe")
    if (!existe) {
        const div = document.createElement("div");
        div.classList.add("mensaje", "existe");
        div.textContent = m;
        header.insertBefore(div, header.children[2])


        setTimeout(() => {
         div.remove()   
    }, 3000);

    }
}

//limpiar busqueda
function limpiar(){
   while (principal.firstChild) {
       principal.removeChild(principal.firstChild)
       
   }
    
}



