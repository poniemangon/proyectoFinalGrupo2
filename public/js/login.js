let formulario = document.querySelector("#formulario-login");
let inputs = document.querySelectorAll("#formulario-login input");

const regularExpressions = {
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //Tiene que ser un mail
  contra: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z0-9_\-\s]{8,32}$/, // Al menos una mayuscula, una minuscula, un numero y 8 caracteres
};

let campos = {
  email: false,
  password: false,
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

const validacionForm = function (e) {
  switch (e.target.name) {
    case "email":
      validacionInput(regularExpressions.correo, e.target, "email");
      break;
    case "password":
      validacionInput(regularExpressions.contra, e.target, "password");
      break;
  }
};

inputs.forEach((input) => {
  input.addEventListener("blur", validacionForm);
  input.addEventListener("keyup", validacionForm);
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  if (campos.email && campos.password) {
    formulario.submit();
    document
      .querySelector(".mensaje-incorrecto-invisible")
      .classList.remove("mensaje-incorrecto-visible");
  } else {
    e.preventDefault();
    document
      .querySelector(".mensaje-incorrecto-invisible")
      .classList.add("mensaje-incorrecto-visible");
  }
});
