import React, { useEffect, useState } from "react";
import "../styles/estiloPrincipal.css";
import ENDPOINTS from "../services/endpoints";
import fetchApiM1 from "../services/fetchApi";
import Tabla from './Tabla.jsx'


function Principal() {
  //funciones
  const [filteredAndSortedData1, setFilteredAndSortedData1] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [dependenciaData, setDependenciaData] = useState([]);
  const [ejeData, setEjeData] = useState([]);
  const [macroProcData, setMacroProcData] = useState([]);
  const [procedimientosData, setProcedimientosData] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ searchAnio: "", eje: "", macroProceso: "", dependencia: "", area: "", teletrabajado : "", tipo:"", 
    estado: ""});

    const [teletrabajado, setTeletrabajado] = useState(null); 
    const [oficializado, setOficializado] = useState(null); 
    const [critico, setCritico] = useState(null); 

 ///funciones para manejar los checks 
 const handleTeletrabajadoChange = (e) => {
  setTeletrabajado((prevValue) => (prevValue === e.target.value ? "" : e.target.value));
};
 const handleOficializado = (e) => {
  setOficializado((prevValue) => (prevValue === e.target.value ? "" : e.target.value));
};
 const handleCritico = (e) => {
  setCritico((prevValue) => (prevValue === e.target.value ? "" : e.target.value));
};

    //funcion para remover acento de los datos y filtros
    const removeAccents = (str) => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    };
    useEffect(() => {
      const newFilteredData = procedimientosData.filter((item) => {
        const normalizedAnio = removeAccents(item.anioActualizacion.toString().toLowerCase());
        const normalizedEje = removeAccents(item.nombreEjeEstrategico.toLowerCase());
        const normalizedMacroProceso = removeAccents(item.nombreMacroproceso.toLowerCase());
        const normalizedDependencia = removeAccents(item.nombreDependencia.toLowerCase());
        const normalizedArea = removeAccents(item.nombreArea.toLowerCase());
        const normalizedTeletrabajado = removeAccents(item.teletrabajado.toLowerCase());
        const normalizedTipo = removeAccents(item.tipoProcedimiento.toLowerCase());
        const normalizedEstado = removeAccents(item.estado.toLowerCase());
  
        const normalizedSearchAnio = removeAccents(filters.searchAnio.toLowerCase());
        const normalizedEjeFilter = removeAccents(filters.eje.toLowerCase());
        const normalizedMacroProcesoFilter = removeAccents(filters.macroProceso.toLowerCase());
        const normalizedDependenciaFilter = removeAccents(filters.dependencia.toLowerCase());
        const normalizedAreaFilter = removeAccents(filters.area.toLowerCase());
        const normalizedTeletrabajadoFilter = removeAccents(filters.teletrabajado.toLowerCase());
        const normalizedTipoFilter = removeAccents(filters.tipo.toLowerCase());
        const normalizedEstadoFilter = removeAccents(filters.estado.toLowerCase());
  
        return (
          (!filters.searchAnio || normalizedAnio.includes(normalizedSearchAnio)) &&
          (!filters.eje || normalizedEje.includes(normalizedEjeFilter)) &&
          (!filters.macroProceso || normalizedMacroProceso.includes(normalizedMacroProcesoFilter)) &&
          (!filters.dependencia || normalizedDependencia.includes(normalizedDependenciaFilter)) &&
          (!filters.area || normalizedArea.includes(normalizedAreaFilter)) &&
          (!filters.teletrabajado || normalizedTeletrabajado.includes(normalizedTeletrabajadoFilter)) &&
          (!filters.tipo || normalizedTipo === (normalizedTipoFilter)) &&
          (!filters.estado || normalizedEstado === (normalizedEstadoFilter))
        );
      });
      setFilteredAndSortedData1(newFilteredData);
    }, [filters, procedimientosData]);
    
  useEffect(() => {
    // Hacer la solicitud para obtener los datos
    const fetchData = async () => {
      try {
        //busqueda de Area
        const result = await fetchApiM1(ENDPOINTS.GETAREA);
        if (Array.isArray(result)) {
          setAreaData(result);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        //busqueda de Area
        const result2 = await fetchApiM1(ENDPOINTS.GETDEPENDENCIAS);
        if (Array.isArray(result2)) {
          setDependenciaData(result2);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        //busqueda de Area
        const result3 = await fetchApiM1(ENDPOINTS.GETEJE);
        if (Array.isArray(result3)) {
          setEjeData(result3);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        //busqueda de Area
        const result4 = await fetchApiM1(ENDPOINTS.GETMACROP);
        if (Array.isArray(result4)) {
          setMacroProcData(result4);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        const resultProc = await fetchApiM1(ENDPOINTS.GETPROC);
        if (Array.isArray(resultProc)) {
          console.log(resultProc)
            const cleanData = resultProc.map(item => ({
                ...item,
                nombreProcedimiento: item.nombreProcedimiento || "No especificado",
                idArea: item.idArea || "Sin área",
                idDependencia: item.idDependencia || "Sin dependencia",
                idMacroproceso: item.idMacroproceso || "No definido",
                idEje: item.idEje || "No asignado",
                anioActualizacion: item.anioActualizacion || "Sin año",
              }));
          setProcedimientosData(cleanData);
          console.log(cleanData);
        } else {
          console.error("Unexpected data format:", result);
          setError("Unexpected data received from API."); // Provide a more informative error message
        }
        //busqueda de Artista con id
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      }
    };
    fetchData();

     // Llamar a la función de fetch al montar el componente
  }, []); // El array vacío asegura que esto solo se ejecute una vez cuando el componente se monta
  // Función para quitar las tildes de las vocales

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFilters({
        ...filters,
        [name]: checked ? value : ''
      });
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };




  return ( 
  <div className="contenedorPrincipal">
    <div className="container py-4">
      {/* Filtros de la primera fila */}
      <div className="col-md-3">
        <div className="card card-custom">
          <label htmlFor="idEje" className="form-label">
            Filtrar Eje
          </label>
          <select
            id="idEje"
            className="form-select"
            name="eje"
            onChange={handleFilterChange}
          >
            <option value="">Ninguna</option>
            {ejeData.map((item) => (
              <option key={item.idEje} value={item.nombreEjeEstrategico}>
                {item.nombreEjeEstrategico.slice(0, 20)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card card-custom">
          <label htmlFor="idArea" className="form-label">
            Filtrar Área
          </label>
          <select
            id="idArea"
            className="form-select"
            name="area"
            onChange={handleFilterChange}
          >
            <option value="">Ninguna</option>
            {areaData.map((item) => (
              <option key={item.idArea} value={item.nombreArea}>
                {item.nombreArea}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card card-custom">
          <label htmlFor="idDependencia" className="form-label">
            Filtrar Dependencia
          </label>
          <select
            id="idDependencia"
            className="form-select"
            name="dependencia"
            onChange={handleFilterChange}
          >
            <option value="">Ninguna</option>
            {dependenciaData.map((item) => (
              <option key={item.idDependencia} value={item.nombreDependencia}>
                {item.nombreDependencia}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Segunda fila de filtros */}
      <div className="col-md-4">
        <div className="card card-custom">
          <label htmlFor="idMacroproceso" className="form-label">
            Filtrar Macroproceso
          </label>
          <select
            id="idMacroproceso"
            className="form-select"
            name="macroProceso"
            onChange={handleFilterChange}
          >
            <option value="">Ninguna</option>
            {macroProcData.map((item) => (
              <option key={item.idMacroproceso} value={item.nombreMacroproceso}>
                {item.nombreMacroproceso}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-custom">
          <label htmlFor="anoActualizacion" className="form-label">
            Año Actualización
          </label>
          <input
            type="number"
            id="anoActualizacion"
            className="form-control"
            name="searchAnio"
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-custom">
          <label className="form-label">Teletrabajado</label>
          <div>
            <input
              type="checkbox"
              id="teletrabajadoSi"
              checked={teletrabajado === 'SI'}
              name="teletrabajado"
              value="SI"
              onChange={
                (e) => {
                 handleFilterChange(e) ;
                 handleTeletrabajadoChange(e);
                }}
            />
            <label htmlFor="teletrabajadoSi">SI</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="teletrabajadoNo"
              name="teletrabajado"
              checked={teletrabajado === 'NO'}
              value="NO"
              onChange={
                (e) => {
                 handleFilterChange(e) ;
                 handleTeletrabajadoChange(e)
                }
                }
            />
            <label htmlFor="teletrabajadoNo">NO</label>
          </div>
        </div>
      </div>

      {/* Tercera fila de filtros */}
      <div className="col-md-4">
        <div className="card card-custom">
          <label className="form-label">Tipo Procedimiento</label>
          <div>
            <input
              type="checkbox"
              id="procedimientoCritico"
              checked={critico === 'Critico'}
              name="tipo"
              value="Critico"
              onChange={
                (e) => {
                 handleFilterChange(e) ;
                 handleCritico(e)
                }}
            />
            <label htmlFor="procedimientoCritico">Critico</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="procedimientoNoCritico"
              checked={critico === 'No Critico'}
              name="tipo"
              value="No Critico"
              onChange={
                (e) => {
                 handleFilterChange(e) ;
                 handleCritico(e)
                }}
            />
            <label htmlFor="procedimientoNoCritico">No Crítico</label>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-custom">
          <label className="form-label">Estado</label>
          <div>
            <input
              type="checkbox"
              id="estadoOficializado"
              name="estado"
              value="Oficializado"
              onChange={handleFilterChange}
            />
            <label htmlFor="estadoOficializado">Oficializado</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="estadoNoOficializado"
              name="estado"
              value="No Oficializado"
              onChange={handleFilterChange}
            />
            <label htmlFor="estadoNoOficializado">No Oficializado</label>
          </div>
        </div>
      </div>

     
    </div>
     {/* Tabla filtrada */}
     <div className="contenedorTabla">
        <Tabla dataf={filteredAndSortedData1} />
      </div>
  </div>
);
}

export default Principal;
