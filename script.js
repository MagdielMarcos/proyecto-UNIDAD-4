//SELECCIÓN DE PROFESORES
// Muestra automáticamente los profesores de Matemáticas al cargar la página
window.onload = function() {
    mostrarProfesores('Matemáticas');
    setInterval(cambiarFuncionAutomaticamente, 3000); // Cambiar cada 3 segundos (ajustable)
  };

function mostrarProfesores(materia) {
    // Oculta todos los bloques de profesores
    var bloquesProfesores = document.querySelectorAll('.profesores');
    bloquesProfesores.forEach(bloque => {
      bloque.style.display = 'none';
    });
  
    // Muestra el bloque de profesores correspondiente a la materia seleccionada
    var bloqueProfesores = document.getElementById('profesores' + materia);
    if (bloqueProfesores) {
      bloqueProfesores.style.display = 'block';
    }
  }


