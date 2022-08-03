const categories = document.querySelectorAll(".job-card__category");

const filtersBar = document.querySelector(".filter");

const containerCategoriesBar = document.querySelector(
  ".filter_categories-list"
);

const clearFiltersButton = document.querySelector(".filter_button-clear");

const displayFiltersBar = () => {
  const displayNoneBarraFiltros =
    filtersBar.classList.contains("--display-none");

  if (displayNoneBarraFiltros === true) {
    filtersBar.classList.remove("--display-none");
  }
};

const addElementToFiltersBar = (textCategory) => {
  const parentCategory = document.createElement("div");
  parentCategory.classList.add("filter__category");

  const childTextCategory = document.createElement("span");
  childTextCategory.classList.add("category");
  childTextCategory.classList.add("category-selected");
  childTextCategory.innerText = textCategory;

  const childDeleteCategory = document.createElement("button");
  childDeleteCategory.classList.add("category-delete");

  containerCategoriesBar.append(parentCategory);
  parentCategory.append(childTextCategory, childDeleteCategory);

  addHandlerDeleteCategory(childDeleteCategory, textCategory);
  filterElements();
};

function addHandlerDeleteCategory(element, textCategory) {
  element.addEventListener("click", () => {
    const parentButton = element.parentElement;
    containerCategoriesBar.removeChild(parentButton);

    if (containerCategoriesBar.childElementCount === 0) {
      filtersBar.classList.add("--display-none");
    }

    deleteStyleSelectedCategory(textCategory);

    filterElements();
  });
}

const checkIfCategoriesExist = (textCategory) => {
  const selectedCategories = document.querySelectorAll(".category-selected");

  if (selectedCategories.length >= 1) {
    let nonExistent = true;

    for (const categoriaSeleccionada of selectedCategories) {
      if (categoriaSeleccionada.textContent === textCategory) {
        nonExistent = false;
      }
    }
    if (nonExistent) {
      addElementToFiltersBar(textCategory);
    }
  } else {
    addElementToFiltersBar(textCategory);
  }
};

const styleSelectedCategory = (textCategory) => {
  for (const category of categories) {
    if (category.textContent === textCategory) {
      category.classList.add("category--selected");
    }
  }
};

const deleteStyleSelectedCategory = (textCategory) => {
  for (const category of categories) {
    if (category.textContent === textCategory) {
      category.classList.remove("category--selected");
    }
  }
};

const handlerCategoryClick = (event) => {
  const element = event.target;
  const textCategory = element.textContent;

  displayFiltersBar();
  checkIfCategoriesExist(textCategory);
  styleSelectedCategory(textCategory);
};

for (const category of categories) {
  category.addEventListener("click", handlerCategoryClick);
}

clearFiltersButton.addEventListener("click", () => {
  containerCategoriesBar.innerHTML = [];
  filtersBar.classList.add("--display-none");
  filterElements();

  for (const category of categories) {
    category.classList.remove("category--selected");
  }
});

const filterElements = () => {
  const filters = [...document.querySelectorAll(".filter__category")];
  const cards = [...document.querySelectorAll(".job-card__categories-list")];

  if (filters.length === 0) {
    for (const card of cards) {
      card.parentElement.classList.remove("--display-none");
    }
  } else {
    for (const card of cards) {
      let exists = false;

      for (const currentCategory of [...card.children]) {
        for (const filter of filters) {
          if (filter.textContent === currentCategory.textContent) {
            exists = true;
          }
        }
      }

      if (exists) {
        card.parentElement.classList.remove("--display-none");
      } else {
        card.parentElement.classList.add("--display-none");
      }
    }
  }
};
