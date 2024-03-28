window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const firstName = document.querySelector("#inputNombre");
  const lastName = document.querySelector("#inputApellido");
  const url = "https://todo-api.ctd.academy/v1";

  email.addEventListener("input", (e) => {
    validarEmail(e);
    checkFormErrors(email, password); // Verificar errores y deshabilitar botón si es necesario
  });
  password.addEventListener("input", (e) => {
    validarContrasenia(e);
    checkFormErrors(email, password); // Verificar errores y deshabilitar botón si es necesario
  });

  // el evento blur desencadenar el evento una vez que abandono el input, por eso si está vacio, le indico que lo obligue a cargarlo
  email.addEventListener("blur", (e) =>
    isEmpty(`⚠️Se requiere que ingrese su ${email.name}`, e)
  );
  password.addEventListener("blur", (e) =>
    isEmpty(`⚠️Se requiere que ingrese su ${password.name}`, e)
  );

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Aquí podemos mostrar el spinner para indicar a la persona que se
    // ha iniciado el proceso de registro
    mostrarSpinner();

    const payload = {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    };

    console.log(payload);

    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };
    realizarRegister(settings);

    form.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    fetch(`${url}/users/`, settings)
      .then((response) => {
        if (response.ok) return response.json();
        response.json().then((errorData) => {
          alert(errorData);
          throw new Error(errorData);
        });
        return Promise.reject(response);
      })
      .then((data) => {
        console.log(data);
        if (data.jwt) {
          localStorage.setItem("jwt", JSON.stringify(data.jwt));
          // Una vez obtenida la respuesta de la API, ocultamos el spinner
          ocultarSpinner();
          location.replace("./mis-tareas.html");
        }
      })
      .catch((err) => {
        console.error(err);
        console.error(err.status);
        // Ocultamos el spinner en caso de error
        ocultarSpinner();
        // if (err.status == 400) {
        //   console.warn(
        //     "El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto"
        //   );
        //   alert(
        //     "El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto"
        //   );
        // } else {
        //   console.error("Error del servidor | url no existe");
        // }
      });
  }
});
