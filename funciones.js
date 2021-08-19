let DB;

const formulario = document.querySelector('#formulario')


function conectarDB() {
    const abriConexion = window.indexedDB.open('crm', 1);

    abriConexion.onerror = () => {
        console.log('Hubo un error')
    }

    abriConexion.onsuccess = () => {
        DB = abriConexion.result;
    }
}

function imprimirAlerta(mensaje, tipo) {
        
    const mensajeAlerta = document.createElement('p');
    if(tipo === 'error') {
        mensajeAlerta.classList.add('error')
        mensajeAlerta.textContent = mensaje;

        formulario.appendChild(mensajeAlerta);
            setTimeout(() => {
                mensajeAlerta.remove();
            }, 2500);
    } else {
        mensajeAlerta.classList.add('correcto');
        mensajeAlerta.textContent = mensaje;

        formulario.appendChild(mensajeAlerta);
            setTimeout(() => {
                mensajeAlerta.remove();
            }, 2500);

    }
}

