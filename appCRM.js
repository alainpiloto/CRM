(function() {
   const listadoClientes = document.querySelector('#listado-clientes');

    window.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if(window.indexedDB.open('crm', 1) ){ 
            obtenerClientes();
        }
        
        listadoClientes.addEventListener('click', eliminarRegistro)
    })

    function eliminarRegistro(e) {
        
        if(e.target.classList.contains('eliminar')) {
            const idEliminar = Number(e.target.dataset.cliente);
            const alerta = document.querySelector('.alert-container');

            const botonSi = document.querySelector('.botonSi');
            const botonNo = document.querySelector('.botonNo');
            
            alerta.classList.remove('hide')
            botonSi.addEventListener('click', () => {
                const transaction = DB.transaction(['crm'], 'readwrite');

                    const objectStore = transaction.objectStore('crm');

                    objectStore.delete(idEliminar)
                    
                    transaction.oncomplete = () => {
                       location.reload();
                    }

                    transaction.onerror = () => {
                        console.log('hubo un error')
                    }

                    alerta.classList.add('hide');
            })

            botonNo.addEventListener('click', () => {
                alerta.classList.add('hide');
            })  

                     }
    }

    function obtenerClientes() {
        const abriConexion = window.indexedDB.open('crm', 1)
        
        abriConexion.onerror = () => {
            console.log('hubo un error')
        }

        abriConexion.onsuccess = () => {
            DB = abriConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = (e) => {
                const cursor = e.target.result;
                if(cursor) {
                    const {nombre, email, telefono, empresa, id} = cursor.value;

                    listadoClientes.innerHTML += `
                    <tr>
                        <td class="primerTd">
                            <p class="nombreTd">${nombre}</p>
                            <p class="correoTd">${email}</p>
                        </td>
                        <td>${telefono}</td>
                        <td>${empresa}</td>
                        <td class="acciones">
                            <a href="editar-cliente.html?id=${id}" class="editar"><span class="material-icons-outlined">
                            edit
                            </span>Editar</a>
                            <a class="eliminar" href="#" data-cliente="${id}"><span class="material-icons-outlined">
                            person_remove
                            </span>Eliminar</a>
                        </td>
                    </tr>    
                    ` 
                    cursor.continue();
                } else {
                    console.log('No has mas registros')
                }
            }
        }
    }

    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = () => {
            console.log('Hubo un error');
        }

        crearDB.onsuccess = () => {
            DB = crearDB.result;
            console.log(DB)
        }

        crearDB.onupgradeneeded = (e) => {
            const db = e.target.result;
            const objectStore = db.createObjectStore('crm', {
                keyPath : 'id',
                autoIncrement : true
            })
            objectStore.createIndex('nombre', 'nombre', {unique : false});
            objectStore.createIndex('email', 'email', {unique : true});
            objectStore.createIndex('telefono', 'telefono', {unique : false});
            objectStore.createIndex('empresa', 'empresa', {unique : false});
            objectStore.createIndex('id', 'id', {unique : true});
            console.log('DB lista y creada!')
        }

    }
})();


