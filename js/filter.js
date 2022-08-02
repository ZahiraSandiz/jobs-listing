const contenedoresCategoriasCards = document.querySelectorAll(
  ".job-card__categories-list"
);
const categoriasCards = document.querySelectorAll(".job-card__category");

const barraFiltros = document.querySelector(".filter");
const contenedorCategoriasBarra = document.querySelector(
  ".filter_categories-list"
);
const botonClearFiltros = document.querySelector(".filter_button-clear");

const displayBarraFiltros = () => {
  const displayNoneBarraFiltros =
    barraFiltros.classList.contains("--display-none");

  if (displayNoneBarraFiltros === true) {
    barraFiltros.classList.remove("--display-none");
  }
};

const crearElementoBarraFiltros = (textoCategoria) => {
  const padreCategoria = document.createElement("div");
  padreCategoria.classList.add("filter__category");

  const hijoTextCategoria = document.createElement("span");
  hijoTextCategoria.classList.add("category");
  hijoTextCategoria.classList.add("category-selected");
  hijoTextCategoria.innerText = textoCategoria;

  const hijoDeleteCategoria = document.createElement("button");
  hijoDeleteCategoria.classList.add("category-delete");

  contenedorCategoriasBarra.append(padreCategoria);
  padreCategoria.append(hijoTextCategoria, hijoDeleteCategoria);

  agregarHandlerDeleteCategoria(hijoDeleteCategoria, textoCategoria);
  filtrarElementos();
};

function agregarHandlerDeleteCategoria(elemento, textoCategoria) {
  elemento.addEventListener("click", () => {
    const padreBoton = elemento.parentElement;
    contenedorCategoriasBarra.removeChild(padreBoton);

    if (contenedorCategoriasBarra.childElementCount === 0) {
      barraFiltros.classList.add("--display-none");
    }

    borrarEstiloCategoriaSeleccionada(textoCategoria);

    filtrarElementos();
  });
}

const evaluacionNoRepetirCategorias = (textoCategoria) => {
  const categoriasSeleccionadas =
    document.querySelectorAll(".category-selected");

  if (categoriasSeleccionadas.length >= 1) {
    let noExisteEnLaBarra = true;

    for (const categoriaSeleccionada of categoriasSeleccionadas) {
      if (categoriaSeleccionada.textContent === textoCategoria) {
        noExisteEnLaBarra = false;
      }
    }

    if (noExisteEnLaBarra) {
      crearElementoBarraFiltros(textoCategoria);
    }
  } else {
    crearElementoBarraFiltros(textoCategoria);
  }
};

const estiloCategoriaSeleccionada = (textoCategoria) => {
  for (const categoria of categoriasCards) {
    if (categoria.textContent === textoCategoria) {
      categoria.classList.add("category--selected");
    }
  }
};

const borrarEstiloCategoriaSeleccionada = (textoCategoria) => {
  for (const categoria of categoriasCards) {
    if (categoria.textContent === textoCategoria) {
      categoria.classList.remove("category--selected");
    }
  }
};

const manejadorClickCategoria = (event) => {
  const elemento = event.target;
  const textoCategoria = elemento.textContent;

  displayBarraFiltros();
  evaluacionNoRepetirCategorias(textoCategoria);
  estiloCategoriaSeleccionada(textoCategoria);
};

for (const categoria of categoriasCards) {
  categoria.addEventListener("click", manejadorClickCategoria);
}

botonClearFiltros.addEventListener("click", () => {
  contenedorCategoriasBarra.innerHTML = [];
  barraFiltros.classList.add("--display-none");

  for (const categoria of categoriasCards) {
    categoria.classList.remove("category--selected");
  }
});

const filtrarElementos = () => {
  const categoriasFiltro = document.querySelectorAll(".filter__category");
  const contenedoresCategoriasCards = document.querySelectorAll(
    ".job-card__categories-list"
  );

  if (categoriasFiltro.length === 0) {
    for (const contenedorActual of contenedoresCategoriasCards) {
      contenedorActual.parentElement.classList.remove("--display-none");
    }
  } else {
    for (const categoriaFiltro of categoriasFiltro) {
      for (const contenedorActual of contenedoresCategoriasCards) {
        console.log(contenedorActual);
        let hayCoincidencia = false;
        const categorias = contenedorActual.children;

        for (const categoria of categorias) {
          if (categoria.textContent === categoriaFiltro.textContent) {
            hayCoincidencia = true;
          }
        }

        if (hayCoincidencia === false) {
          contenedorActual.parentElement.classList.add("--display-none");
        } else {
        }
      }
    }
  }
};
