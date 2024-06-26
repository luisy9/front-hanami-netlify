import { FormControl, ListItemText, MenuItem, Select } from "@mui/material"
import { setOptions } from "leaflet"
import { useRef, useState, useEffect, } from "react";





const Filter = ({ setFilters, filterData }) => {
  // inputs donde se guardarán los inputs de los checkboxes para filtrar
  const [inputs, setInputs] = useState([]);
  // controlador para definir si el filtro es visible o no
  const [visible, setVisible] = useState(false);
  // referencia para que se cierre cuando se clique fuera del div
  const dropdownRef = useRef(null);

  // constants
  const nombreConvertido = [
    {
      nombre: 'CerezoCapullo',
      convertido: 'Boton Blanco'
    },
    {
      nombre: 'CerezoGrande',
      convertido: 'Cerezo Grande'
    },
    {
      nombre: 'CerezoInicioFlor',
      convertido: ' Inicio Floración'
    },
    {
      nombre: 'CerezoMaxFloracion',
      convertido: 'Flor Abierta'
    },
    {
      nombre: 'CerezoMediano',
      convertido: 'Cerezo Mediano '
    },
    {
      nombre: 'CerezoMuerto',
      convertido: 'Caida de la flor'
    },
    {
      nombre: 'CerezoPequenio',
      convertido: 'Cerezo Pequeño'
    },
    {
      nombre: 'LavandaCapullo',
      convertido: 'Lavanda sin brotes'
    },
    {
      nombre: 'LavandaInicioFlor',
      convertido: 'Brotes de Lavanda'
    },
    {
      nombre: 'LavandaMaxFloracion',
      convertido: 'Lavanda en Flor'
    },
    {
      nombre: 'LavandaMuerta',
      convertido: 'Lavanda para Cosechar'
    },
    {
      nombre: 'OlivoFlor',
      convertido: 'Olivo Floracion'
    },
    {
      nombre: 'OlivoGrande',
      convertido: 'Olivo Cuajado'
    },
    {
      nombre: 'OlivoMediano',
      convertido: 'Olivo Carolas visibles'
    },
    {
      nombre: 'OlivoPequenio',
      convertido: 'Olivo Inicio'
    },
    {
      nombre: 'ViñaFlor',
      convertido: 'Vid en Flor'
    },
    {
      nombre: 'ViñaUvaGrande',
      convertido: 'Vid Madura'
    },
    {
      nombre: 'ViñaUvaMediana',
      convertido: 'Vid Inicio(Veraison)'
    },
    {
      nombre: 'ViñaUvaPequeña',
      convertido: 'Vid Cuajado'
    }
  ]

  // useEffects
  // para que se cierre cuando se clique fuera del div
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (inputs.length === 0) {
      let distinct = generateDistinctTemporadas()
      distinct = asignarControladorCheckboxes(distinct)
      setInputs(distinct)
    }
  }, [filterData])

  useEffect(() => {
    setFilters(inputs)
  }, [inputs])

  // useEffect(() => {
  //   console.log(temporadas)
  //   if(temporadas){

  //   }
  //   //   const retorno = asignarControladorCheckboxes()
  //   // setInputs(retorno)
  // }, [temporadas])
  // funciones
  // seleccionar infomacion de las temporadas que se van a mapear en el filtro
  function generateDistinctTemporadas() {
    const tempoRepetidas = filterData.map((e) =>
      e.temporadas.map((t) => t.nombre)
    );
    const distinctTemporadas = [];
    tempoRepetidas.forEach((t) => {
      t.forEach((nombreTemporada) => {
        if (!distinctTemporadas.includes(nombreTemporada)) {
          distinctTemporadas.push(nombreTemporada);
        }
      });
    });

    return distinctTemporadas
  }

  // funcion para preparar los inputs de los checkbox del filtro
  function asignarControladorCheckboxes(tempos) {
    let x = [{}]
    const arrObj = tempos.map(temporada => {
      nombreConvertido.map(nc => {
        if (nc.nombre === temporada) {
          x = { nombre: nc.convertido, temporada, seteado: false }
        }
      })
      return x
    })
    return arrObj
  }

  // funcion para modificar el state del checkbox de cada input
  const handleCheckbox = (event) => {
    const { name } = event.target
    const inputsNuevos = inputs.map(i => {
      if (i.temporada === name) {
        i.seteado = !i.seteado
      }
      return i
    })
    setInputs(inputsNuevos)
  }


  // testeo
  // useEffect(() => {
  //   console.log('test')
  //   console.log(inputs)
  //   setFiltros(['olivo'])
  // }, [inputs])

  // useEffect(() => {
  //   console.log('test2')
  //   console.log(filtros)
  // }, [filtros])




  // este useEffect filtra los inputs que están checkeados
  // useEffect(() => {
  //   const filtrados = inputs.filter(i => i.seteado)
  //   console.log("asdfasdfasdfasdfasd", filtrados);
  //   setFiltros(filtrados)
  // }, [inputs])

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setVisible(!visible)}
      >Temporadas</button>


      <div >
        <ul className={`${visible ? 'absolute z-50 bg-white shadow-md p-2 border rounded-md' : 'hidden' }`}>

          {inputs.map(i => {
            return <li className="">
              <label>
                {i.nombre}
              </label>
              <input type="checkbox" 
                name={i.temporada}
                id={i.temporada}
                value={i.temporada}
                checked={i.seteado}
                onChange={handleCheckbox}>

              </input>
            </li>
          })
          }
        </ul>
      </div>
    </div>
  )
}

export default Filter


