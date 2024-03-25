window.addEventListener("load", function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
  
    const form = document.forms[0];
  
    const email = document.querySelector("#inputEmail");
    const password = document.querySelector("#inputPassword");
    const url = "https://todo-api.ctd.academy/v1";
  
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const payload = {
        email: email.value,
        password: password.value,
      };
  
      console.log(payload)
  
      const settings = {
        method : "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type":"application/json"
        }
      };
  
      console.log(settings)
  
       realizarLogin(settings);
      form.reset();
    });
  
    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
      fetch(`${url}/users/login`,settings)
      .then( response => { 
        console.log(response)
        if(response.ok) return response.json();
        response.json().then(errorData => {
          alert(errorData);
          throw new Error(errorData);
        });
        return Promise.reject(response)
      })
    .then(data =>{
      console.log(data);
      console.log(data.jwt);
      if(data.jwt){
        localStorage.setItem("jwt", JSON.stringify(data.jwt));
        location.replace("./mis-tareas.html");
      }
    })
      .catch((err) =>{
        console.error(err);
      })
    }
  });
  