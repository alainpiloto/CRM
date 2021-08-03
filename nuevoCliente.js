(function(){

    window.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        formulario.addEventListener('submit', validarCliente)
    })

    function conectarDB() {
        const abriConexion = window.indexedDB.open('crm', 1);

        abriConexion.onerror = () => {
            console.log('Hubo un error')
        }

        abriConexion.onsuccess = () => {
            DB = abriConexion.result;
        }
    }

    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;
        
        if(nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los Campos son Obligatorios', 'error')
            return;
        } 

            const cliente = {
                nombre,
                email,
                telefono,
                empresa,
                id : Date.now()
            }
            
            
        

            crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = () => {
            imprimirAlerta('Hubo un error', 'error');
        }

        transaction.oncomplete = () => {
            imprimirAlerta('Cliente Agregado Correctamente')
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);

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

    
})();

