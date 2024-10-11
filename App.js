class Product {
    constructor(name, price, year) {
      this.name = name;
      this.price = price;
      this.year = year;
    }
  }

class UI {
    addProduct(product) {
      const productList = document.getElementById("product-list");
      const element = document.createElement("div");
      element.innerHTML = `
              <div class="card text-center mb-2">
                  <div class="card-body">
                      <strong>Nombre del Producto</strong>: ${product.name} 
                      <strong>Precio del Producto</strong>: Q.${product.price} 
                      <strong>Año del Producto</strong>: ${product.year}
                      <a href="#" class="btn btn-danger" name="delete">Delete</a>
                  </div>
              </div>
          `;
      productList.appendChild(element);
    }
  

    resetForm() {
      document.getElementById("product-form").reset();
    }
  
    deleteProduct(element) {
      if (element.name === "delete") {
        element.parentElement.parentElement.remove();
        this.showMessage("Producto eliminado exitosamente", "success");
      }
    }
  
    showMessage(message, cssClass) {
      const div = document.createElement("div");
      div.className = `alert alert-${cssClass} mt-2`;
      div.appendChild(document.createTextNode(message));
  
      // Show in The DOM
      const container = document.querySelector(".container");
      const app = document.querySelector("#App");
      container.insertBefore(div, app);
      setTimeout(function () {
        document.querySelector(".alert").remove();
      }, 3000);
    }
  }
  

// DOM Events
document.getElementById("product-form")
  .addEventListener("submit", function (e) {

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;

    const product = new Product(name, price, year);
   
    const ui = new UI();

    // Validación del formulario
    if (name === "" || price === "" || year === "") {
      ui.showMessage("Por favor inserte datos en todos los campos", "danger");
      e.preventDefault(); // Detener el comportamiento por defecto
      return; // Evitar que el producto se agregue si hay campos vacíos
    }

    // Si la validación pasa, se agrega el producto
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage("Producto agregado exitosamente", "success");

    e.preventDefault(); // Detener el comportamiento por defecto del formulario
  });

document.getElementById("product-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteProduct(e.target);
});

