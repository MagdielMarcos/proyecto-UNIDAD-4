//SELECCIÓN DE PROFESORES
// Muestra automáticamente los profesores de Matemáticas al cargar la página
window.onload = function() {
    mostrarProfesores('Matemáticas');
    setInterval(cambiarFuncionAutomaticamente, 3000); // Cambiar cada 3 segundos
  };

function mostrarProfesores(materia) {
    // Oculta todos los bloques de profesores
    const bloquesProfesores = document.querySelectorAll('.profesores'); //puse de var a const
    bloquesProfesores.forEach(bloque => {
      bloque.style.display = 'none';
    });
  
    // Muestra el bloque de profesores correspondiente a la materia seleccionada
    const bloqueProfesores = document.getElementById('profesores' + materia); //puse de var a const
    if (bloqueProfesores) {
      bloqueProfesores.style.display = 'block';
    }
  }


//SWIPER SLIDE COURSES SECTION
var swiper = new Swiper(".course-slider", {
  spaceBetween: 20,
  grabCursor: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});