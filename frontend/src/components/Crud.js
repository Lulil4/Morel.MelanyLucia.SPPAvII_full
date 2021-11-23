import { React, useState, useEffect } from 'react'
import Tabla from './Tabla'
import Loader from './Loader'
import Formulario from './Formulario'
import '../App.css'
import { useHistory } from 'react-router-dom';

const Crud = () => {
    const URL = "http://localhost:3000/api/mascotas/";
    const URLTIPOS = "http://localhost:3000/api/tipos/";
    const [mascotas, setMascotas] = useState([]);
    const [mascotaEdit, setMascotaEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tiposMascota, setTipos] = useState([]);
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);

        const getMascotas = async (url) => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                data.forEach((mascota) => {
                    setMascotas((mascotas) => {
                        return [...mascotas, mascota];
                    });
                });
                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        }

        const getTipos = async (url) => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                data.forEach((tipo) => {
                    setTipos((tiposMascota) => {
                        return [...tiposMascota, tipo];
                    });
                });
            } catch (error) {
                console.error(error.message);
            }
        }
        setTimeout(() => {
            getMascotas(URL);
            getTipos(URLTIPOS);
            setIsLoading(false);
        }, 700);
  
    }, [])


    const createMascota = (newMascota) => {
        setIsLoading(true);

        setTimeout(() => {
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMascota)
            }).then(res => res.json())
                .then(nuevaMascota => setMascotas([...mascotas, nuevaMascota]))
                .finally(() => {
                    setIsLoading(false);
                    alert("Alta exitosa :) <3");
                });
        }, 500);
    };

    const updateMascota = (mascotaUpdated) => {
        setIsLoading(true);
        setTimeout(() => {
            fetch(URL + mascotaUpdated.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mascotaUpdated)
            }).then((res) => {
                return res.json();
            })
                .then((mascotaModificada) => {
                    setMascotas((mascotas) => {
                        return mascotas.map((mascota) => mascota.id === mascotaModificada.id ? mascotaModificada : mascota);
                    });
                    alert("Modificacion exitosa! :) <3");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 500);
    }

    const deleteMascota = (id) => {

        if (window.confirm("Confirma eliminación de " + id)) {
            setIsLoading(true);

            setTimeout(() => {
                fetch(URL + id, {
                    method: "DELETE"
                }).then((res) => {
                    if (res.ok) {
                        setMascotas(mascotas => {
                            return mascotas.filter(mascota => mascota.id !== id);
                        });
                        alert("Borrado exitoso!");
                    }
                })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }, 500);
        }
    }

    const irDetalle = id => {
        history.push("/mascota/" + id);
    };

    return (
        <div className="columns is-centered">
            <div className="column is-6">
                <Formulario className="form"
                    createMascota={createMascota}
                    updateMascota={updateMascota}
                    mascotaEdit={mascotaEdit}
                    setMascotaEdit={setMascotaEdit}
                    tiposMascota={tiposMascota}
                    irDetalle={irDetalle}
                />
            </div>
            <div className="column is-6">
            <h2 style={{"text-align":"center", "color":"white", "-webkit-text-stroke":"1px black"}} className="title is-3">Mascotas List</h2>
                {
                    isLoading ? (<Loader />) :
                        (<Tabla data={mascotas}
                            setMascotaEdit={setMascotaEdit}
                            deleteMascota={deleteMascota}
                            irDetalle={irDetalle} />)
                }

            </div>
        </div>




    )
}

export default Crud
