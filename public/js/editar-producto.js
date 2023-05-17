const formulario = document.querySelector("#formulario");
const inputs = document.querySelectorAll("#formulario input");
const currentValues = {
  name: document.querySelector("#name").value,
  description: document.querySelector("#description").value,
  product_image: '',
};
const regularExpressions = {
  nombre: /^[a-zA-ZÁ-ÿ0-9_.+-\s]{5,100}$/,
  descripcion: /^[a-zA-ZÁ-ÿ0-9_.+-\s]{20,500}$/,
  imagen: /^.*\.(jpeg|jpg|gif|png)$/,
};

let campos = {
  name: true,
  description: true,
  product_image: true,
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
      if (e.target.value.trim() !== currentValues.name) {
        validacionInput(regularExpressions.nombre, e.target, "name");
      } else {
        document.getElementById("name").classList.remove("input-invalido");
        document.getElementById("name").classList.add("input-valido");
        document
          .querySelector(".container-name .small-valido")
          .classList.remove("small-invalido");
        campos.name = true;
      }
      break;
    case "product_image":
      if (e.target.files.length > 0) {
        currentValues.product_image = e.target.files[0].name;
        validacionInput(regularExpressions.imagen, e.target, "product_image");
      } else {
        currentValues.product_image = '';
        document.getElementById("product_image").classList.remove("input-invalido");
        document.getElementById("product_image").classList.add("input-valido");
        document
          .querySelector(".container-product_image .small-valido")
          .classList.remove("small-invalido");
        campos.product_image = true;
      }
      break;
    case "description":
      if (e.target.value.trim() !== currentValues.description) {
        validacionInput(regularExpressions.descripcion, e.target, "description");
      } else {
        document.getElementById("description").classList.remove("input-invalido");
        document.getElementById("description").classList.add("input-valido");
        document
          .querySelector(".container-description .small-valido")
          .classList.remove("small-invalido");
        campos.description = true;
      }
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

  if (campos.name && campos.description) {
    if (currentValues.product_image !== '' || document.getElementById("product_image").files.length > 0) {
      validacionInput(regularExpressions.imagen, document.getElementById("product_image"), "product_image");
    }

    if (campos.product_image) {
      formulario.submit();
      document.querySelector(".mensaje-incorrecto-invisible").classList.remove("mensaje-incorrecto-visible");
      document.querySelector(".mensaje-incorrecto-invisible").classList.add("mensaje-incorrecto-invisible");
    } else {
      e.preventDefault();
      document.querySelector(".mensaje-incorrecto-invisible").classList.add("mensaje-incorrecto-visible");
      document.querySelector(".mensaje-incorrecto-invisible").classList.remove("mensaje-incorrecto-invisible");
    }
  } else {
    e.preventDefault();
    document.querySelector(".mensaje-incorrecto-invisible").classList.add("mensaje-incorrecto-visible");
    document.querySelector(".mensaje-incorrecto-invisible").classList.remove("mensaje-incorrecto-invisible");
  }
});


