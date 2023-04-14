const formulario = document.querySelector("#formulario-register");
const inputs = document.querySelectorAll("#formulario-register input");

const regularExpressions = {
  nombre: /^[a-zA-ZÁ-ÿ\s]{2,50}$/, //Letras, espacios y pueden llevar tildes
  apellido: /^[a-zA-ZÁ-ÿ\s]{2,50}$/, //Letras, espacios y pueden llevar tildes
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //Tiene que ser un mail
  contra: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z0-9_\-\s]{8,32}$/, // Al menos una mayuscula, una minuscula, un numero y 8 caracteres
  imagen: /^.*\.(jpeg|jpg|gif|png)$/,
};

let campos = {
  name: false,
  surname: false,
  email: false,
  password: false,
  user_image: false,
};

const validacionInput = function (regularExpression, target, input) {
  if (regularExpression.test(target.value)) {
    document.getElementById(`${input}`).classList.remove("input-invalido");
    document.getElementById(`${input}`).classList.add("input-valido");
    document
      .querySelector(`.container-${input} .small-valido`)
      .classList.remove("small-invalido");
    campos[input] = true;
  } else {
    document.getElementById(`${input}`).classList.remove("input-valido");
    document.getElementById(`${input}`).classList.add("input-invalido");
    document
      .querySelector(`.container-${input} .small-valido`)
      .classList.add("small-invalido");
    campos[input] = false;
  }
};

const validacionContras = function () {
  let password1 = document.getElementById("password");
  let password2 = document.getElementById("repassword");

  if (password1.value === password2.value && password1.value != "") {
    password2.classList.remove("input-invalido");
    password2.classList.add("input-valido");
    document
      .querySelector(".container-repassword .small-valido")
      .classList.remove("small-invalido");
    campos["password"] = true;
  } else {
    password2.classList.remove("input-valido");
    password2.classList.add("input-invalido");
    document
      .querySelector(".container-repassword .small-valido")
      .classList.add("small-invalido");
    campos["password"] = false;
  }
};

const validacionForm = function (e) {
  switch (e.target.name) {
    case "name":
      validacionInput(regularExpressions.nombre, e.target, "name");
      break;
    case "surname":
      validacionInput(regularExpressions.apellido, e.target, "surname");
      break;
    case "email":
      validacionInput(regularExpressions.correo, e.target, "email");
      break;
    case "password":
      validacionInput(regularExpressions.contra, e.target, "password");
      validacionContras();
      break;
    case "repassword":
      validacionContras();
      break;
    case "user_image":
      validacionInput(regularExpressions.imagen, e.target, "user_image");
      break;
  }
};

inputs.forEach((input) => {
  input.addEventListener("blur", validacionForm);
  input.addEventListener("keyup", validacionForm);
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    campos.name &&
    campos.surname &&
    campos.email &&
    campos.password &&
    campos.user_image
  ) {
    formulario.submit();
    document
      .querySelector(".mensaje-correcto-invisible")
      .classList.add("mensaje-correcto-visible");
    document
      .querySelector(".mensaje-correcto-invisible")
      .classList.remove("mensaje-correcto-invisible");
    document
      .querySelector(".mensaje-incorrecto-invisible")
      .classList.remove("mensaje-incorrecto-visible");
    document
      .querySelector(".mensaje-incorrecto-invisible")
      .classList.add("mensaje-incorrecto-invisible");
  } else {
    e.preventDefault();
    document
      .querySelector(".mensaje-correcto-invisible")
      .classList.remove("mensaje-correcto-visible");
    document
      .querySelector(".mensaje-correcto-invisible")
      .classList.add("mensaje-correcto-invisible");
    document
      .querySelector(".mensaje-incorrecto-invisible")
      .classList.add("mensaje-incorrecto-visible");
    document
      .querySelector(".mensaje-incorrecto-invisible")
      .classList.remove("mensaje-incorrecto-invisible");
  }
});
