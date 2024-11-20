const efemeridesContainer = document.getElementById('efemerides-container');
const efemeridesList = document.getElementById('efemerides-list');
const loadingText = document.getElementById('loading');
const tituloEfemeride = document.getElementById('titulo-efemeride');

// Función para obtener las efemérides del día
async function obtenerEfemerides() {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1; // Los meses en JS empiezan en 0
    const dia = hoy.getDate();
    const nombreMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Actualiza el título con la fecha actual
    tituloEfemeride.innerHTML = `Efemérides del Día ${dia} de ${nombreMes[mes - 1]}`;

    try {
        const response = await fetch(`https://es.wikipedia.org/api/rest_v1/feed/onthisday/all/${mes}/${dia}`);
        const data = await response.json();

        // Limita a las 10 efemérides más importantes
        const eventosImportantes = data.events.slice(0, 10);

        // Limpia la lista y el mensaje de carga
        efemeridesList.innerHTML = '';
        loadingText.style.display = 'none';

        // Verifica si hay eventos disponibles
        if (eventosImportantes.length === 0) {
            efemeridesList.innerHTML = '<li class="list-group-item">No se encontraron efemérides para hoy.</li>';
        } else {
            // Procesa los primeros 10 eventos
            eventosImportantes.forEach(evento => {
                const eventoDiv = document.createElement('div');
                eventoDiv.className = 'evento';

                // Cambia la primera letra de la primera palabra a mayúscula
                const textoEvento = evento.text.charAt(0).toUpperCase() + evento.text.slice(1);

                eventoDiv.innerHTML = `
                    <div class="year">${evento.year}</div>
                    <div class="text">${textoEvento}</div>
                `;

                efemeridesList.appendChild(eventoDiv);
            });
        }
    } catch (error) {
        console.error("Error al obtener las efemérides", error);
        loadingText.textContent = 'Hubo un error al cargar las efemérides. Por favor, intenta nuevamente.';
    }
}

// Llama a la función al cargar la página
obtenerEfemerides();
