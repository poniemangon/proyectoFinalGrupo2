const formulario = document.querySelector("#formulario");
const inputs = document.querySelectorAll("#formulario input");
console.log(inputs);

const regularExpressions = {
  nombre: /^[a-zA-ZÁ-ÿ0-9_.+-\s]{5,100}$/,
  descripcion: /^[a-zA-ZÁ-ÿ0-9_.+%;,-\s]{20,1000}$/,
  imagen: /^.*\.(jpeg|jpg|gif|png)$/,
};

let campos = {
  name: false,
  description: false,
  product_image: false,
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
    case "name":
      validacionInput(regularExpressions.nombre, e.target, "name");
      break;
    case "product_image":
      validacionInput(regularExpressions.imagen, e.target, "product_image");
      break;
    case "description":
      validacionInput(regularExpressions.descripcion, e.target, "description");
      break;
  }
};

inputs.forEach((input) => {
  input.addEventListener("click", validacionForm);
  input.addEventListener("blur", validacionForm);
  input.addEventListener("keyup", validacionForm);
  input.addEventListener("change", validacionForm);
});

const descriptionInput = document.querySelector("#description");

descriptionInput.addEventListener("click", validacionForm);
descriptionInput.addEventListener("blur", validacionForm);
descriptionInput.addEventListener("keyup", validacionForm);
descriptionInput.addEventListener("change", validacionForm);

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  if (campos.name && campos.description && campos.product_image) {
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
