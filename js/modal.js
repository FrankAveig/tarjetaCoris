// Obtener los elementos de los modales
var modalBtns = document.getElementsByClassName("modal-btn");
var modals = document.getElementsByClassName("modal");
var closeBtns = document.getElementsByClassName("close");

// Abrir el modal al hacer clic en el botón correspondiente
Array.from(modalBtns).forEach(function (btn) {
  btn.addEventListener("click", function () {
    var modalId = this.dataset.modal;
    document.getElementById(modalId).style.display = "block";
  });
});

// Cerrar el modal al hacer clic en el botón de cierre
Array.from(closeBtns).forEach(function (btn) {
  btn.addEventListener("click", function () {
    var modal = this.closest(".modal");
    modal.style.display = "none";
  });
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener("click", function (event) {
  Array.from(modals).forEach(function (modal) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});



