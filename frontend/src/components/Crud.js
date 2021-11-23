import {React, useState, useEffect} from 'react'
import Tabla from './Tabla'
import Loader from './Loader'
import Formulario from './Formulario'
import '../App.css'
import { useHistory } from 'react-router-dom';

const Crud = () => {
    const URL = "http://localhost:5000/mascotas/";
    const URLTIPOS = "http://localhost:5000/tipos/";
    const [mascotas, setMascotas] = useState([]);
    const [mascotaEdit, setMascotaEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tiposMascota, setTipos] = useState([]);
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
 
        const getMascotas = async(url)=>{
            try {
                const res = await fetch(url);
                const data = await res.json();
                data.forEach((mascota)=>{
                    setMascotas((mascotas)=>{
                        return [...mascotas, mascota];
                    });
                });
                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        }

        getMascotas(URL);

        const getTipos = async(url)=>{
            try {
                const res = await fetch(url);
                const data = await res.json();
                data.forEach((tipo)=>{
                    setTipos((tiposMascota)=>{
                        return [...tiposMascota, tipo];
                    });
                });
            } catch (error) {
                console.error(error.message);
            }
        }

        
        getTipos(URLTIPOS);
    }, [])
    

    const createMascota = (newMascota)=>{
       setIsLoading(true);
       fetch(URL, {
           method: "POST",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify(newMascota)
       }).then(res=>res.json())
       .then(nuevaMascota=> setMascotas([...mascotas, nuevaMascota]))
       .finally(()=>{
           setIsLoading(false);
       });

       
        alert("Alta exitosa :) <3");
    };

    const updateMascota = (mascotaUpdated)=>{
        setIsLoading(true);
        fetch(URL + mascotaUpdated.id, {
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(mascotaUpdated)
        }).then((res)=>{
            return res.json();
        })
        .then((mascotaModificada) =>{
            setMascotas((mascotas)=>{
                return mascotas.map((mascota)=> mascota.id === mascotaModificada.id ? mascotaModificada : mascota);
            });
        })
        .finally(()=>{
            setIsLoading(false);
        });
           
        alert("Modificacion exitosa! :) <3");
    }

    const deleteMascota = (id)=>{
        
        if(window.confirm("Confirma eliminación de " + id)){
            setIsLoading(true);
            fetch(URL + id, {
                method: "DELETE"
            }).then((res)=>{
                if(res.ok){
                    setMascotas(mascotas => {
                        return mascotas.filter(mascota => mascota.id !== id);
                    });
                    alert("Borrado exitoso!");    
                }
            })
            .finally(()=>{
                setIsLoading(false);
            });
            
        }
    }

    const irDetalle = id => {
            history.push("/mascota/"+id);
        };
    
    return (
        <section>
            <Formulario className="form"
            createMascota={createMascota}
            updateMascota={updateMascota}
            mascotaEdit={mascotaEdit}
            setMascotaEdit={setMascotaEdit}
            tiposMascota={tiposMascota}
            irDetalle={irDetalle}
            />
           
            {
                isLoading? (<Loader/>) : 
                (<Tabla data={mascotas}
                setMascotaEdit={setMascotaEdit}
                deleteMascota={deleteMascota}
                irDetalle={irDetalle}/>)
            }
            
        </section>
    )
}

export default Crud
