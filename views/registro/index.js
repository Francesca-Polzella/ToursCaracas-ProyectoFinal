


const formulario= document.querySelector('#formulario')
const nameInput=document.querySelector('#Nombre')
const apellidoInput=document.querySelector('#Apellido')
const emailInput=document.querySelector('#Correo')
const passwordInput=document.querySelector('#Contraseña')
const password2Input=document.querySelector('#match-input')
const boton=document.querySelector('#boton')
import { crearNotificacion } from "../componentes/notificacion.js"
const notificacion=document.querySelector('#notificacion')


//validar el email
const validaremail= /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
//validar la contraseña
const validarpasswoed= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
//validar nombre y apellido
 const valnombres=/[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s'-]+$/g
 const valapellidos=/[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s'-]+$/g

let valcorreo=false
let valpass=false
let valclave=false
let valnombre=false
let valapellido=false


nameInput.addEventListener('input',(e)=>{
    //console.log(e.target.value)
    //valnombre=e.target.value
//     if(valnombre===''){
//         nameInput.classList.remove('focus:outline-green-700','outline-4')
//         nameInput.classList.remove('focus:outline-red-700','outline-4')
//         nameInput.classList.add('focus:outline-black')  
//     }else{
//         valnombre= true
//         nameInput.classList.remove('focus:outline-black')
//         nameInput.classList.add('focus:outline-green-700','outline-4')
//     }
   valnombre=valnombres.test(e.target.value)
  // console.log(valnombre)
    validar(nameInput,valnombre)
})
apellidoInput.addEventListener('input',(e)=>{
    //console.log(e.target.value)
    // if(valapellido===''){
    //     apellidoInput.classList.remove('focus:outline-green-700','outline-4')
    //     apellidoInput.classList.remove('focus:outline-red-700','outline-4')
    //     apellidoInput.classList.add('focus:outline-black')  
    // }else{
    //     valapellido= true
    //     apellidoInput.classList.remove('focus:outline-black')
    //     apellidoInput.classList.add('focus:outline-green-700','outline-4')
    // }
    //otra forma de hacer la validacion 
    valapellido=valapellidos.test(e.target.value)
    validar(apellidoInput,valapellido)
})
emailInput.addEventListener('input',(e)=>{
    //console.log(e.target.value)
    valcorreo=validaremail.test(e.target.value)
   //console.log(valcorreo)
  validar(emailInput,valcorreo)

})

passwordInput.addEventListener('input',(e)=>{
    //console.log(e.target.value)
    valpass=validarpasswoed.test(e.target.value)
    validar(passwordInput,valpass)
    validar(password2Input,valclave)
    //console.log(valpass)
})

password2Input.addEventListener('input',(e)=>{
    //console.log(e.target.value)
    valclave= e.target.value===passwordInput.value
    validar(password2Input,valclave)
    validar(passwordInput,valpass)
   // console.log(valclave)

})



function validar (input,val){
    boton.disabled= valnombre && valapellido && valcorreo && valpass && valclave ? false : true
     console.log(valnombre,valapellido,valcorreo,valpass,valclave)

     if(val){ 
          //caso de que  pase
         input.classList.remove('focus:outline-black')
         input.classList.remove('focus:outline-red-700','outline-4')
         input.classList.add('focus:outline-green-700','outline-4')
        }else if(input.value===''){
         //caso de que  este vacio
         input.classList.remove('focus:outline-green-700','outline-4')
         input.classList.remove('focus:outline-red-700','outline-4')
         input.classList.add('focus:outline-black')
        }else{
          //caso de que  no pase
          input.classList.remove('focus:outline-black')
          input.classList.remove('focus:outline-green-700','outline-4')
          input.classList.add('focus:outline-red-700','outline-4')
        }
}

//arreglar el boton de registro y las lineas de la casilla de correo

formulario.addEventListener('submit', async (e)=>{
    e.preventDefault()
    try{
        const newUser = {
            Nombre:nameInput.value,
            Apellido:apellidoInput.value,
            Email:emailInput.value,
            Password:passwordInput.value,
            Password2:password2Input.value
        }
        console.log(newUser)
        if(valnombre && valapellido && valcorreo && valclave && valpass){
            const response = await axios.post('/api/users',newUser)
            console.log(response)
            crearNotificacion(false,'Se creo el usuario exitosamente')
            setTimeout(()=>{
                notificacion.innerHTML=``
            },3000)

        }else{
            crearNotificacion(true,'Algunos de los campos no cumple con los requisitos')
            setTimeout(()=>{
                notificacion.innerHTML=``
            },3000)
        }

        
    }catch(error){
        crearNotificacion(true,error.response)
        setTimeout(()=>{
            notificacion.innerHTML=``
        },3000)
        console.log(error)
    }
   
})

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Simulación de una función que devuelve una promesa
    fetchData()
        .then(response => {
            // Verifica si 'data' está definido
            if (response && response.data) {
                console.log(response.data);
            } else {
                console.error('La respuesta no contiene la propiedad "data"');
            }
        })
        .catch(error => {
            console.error('Error en la promesa:', error);
        });
});

// Función simulada que devuelve una promesa
function fetchData() {
    return new Promise((resolve, reject) => {
        // Simulación de una llamada a una API
        setTimeout(() => {
            // Cambia 'null' por un objeto con 'data' para probar
            resolve({ data: 'Datos simulados' });
            // O usa 'reject' para simular un error
            // reject('Error de red');
        }, 1000);
    });
}




