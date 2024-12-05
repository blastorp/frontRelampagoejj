import React, { useEffect, useState } from "react";
import "../styles/estiloPrincipal.css";
import ENDPOINTS from "../services/endpoints";
import fetchApiM1 from "../services/fetchApi";
import Tabla from './Tabla.jsx'


function Principal() {
  //funciones

  const [areaData, setAreaData] = useState([]);
  const [dependenciaData, setDependenciaData] = useState([]);
  const [ejeData, setEjeData] = useState([]);
  const [macroProcData, setMacroProcData] = useState([]);
  const [procedimientosData, setProcedimientosData] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ searchAnio: "", eje: "", macroProceso: "", dependencia: "", area: "", teletrabajado : "", tipo:"", 
    estado: ""});

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
            const cleanData = resultProc.map(item => ({
                ...item,
                nombreProcedimiento: item.nombreProcedimiento || "No especificado",
                idArea: item.idArea || "Sin área",
                idDependencia: item.idDependencia || "Sin dependencia",
                idMacroproceso: item.idMacroproceso || "No definido",
                idEje: item.idEje || "No asignado",
              }));
          setProcedimientosData(cleanData);
          
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
const removeAccents = (str) => {
  return str
    .normalize("NFD") // Normaliza a la forma de descomposición (decomposed form)
    .replace(/[\u0300-\u036f]/g, ""); // Remueve los caracteres de acento
};

const filteredAndSortedData = [...procedimientosData]
  .filter((item) => {
    // Remover tildes de los valores y filtros
    const normalizedAnio = removeAccents(item.anioActualizacion.toLowerCase());
    const normalizedEje = removeAccents(item.eje.toLowerCase());
    const normalizedMacroProceso = removeAccents(item.macroProceso.toLowerCase());
    const normalizedDependencia = removeAccents(item.dependencia.toLowerCase());
    const normalizedArea = removeAccents(item.area.toLowerCase());
    const normalizedTeletrabajado = removeAccents(item.teletrabajado.toLowerCase());
    const normalizedTipo = removeAccents(item.tipo.toLowerCase());
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
      (!filters.tipo || normalizedTipo.includes(normalizedTipoFilter)) &&
      (!filters.estado || normalizedEstado.includes(normalizedEstadoFilter))
    );
  });


  const cleanProc = (dataArray) => {
    return dataArray.map(data => ({
      idProcedimiento: data.idProcedimiento || 0,
      idEje: data.idEje || 0,
      idArea: data.idArea || 0,
      idDependencia: data.idDependencia || 0,
      tipoProcedimiento: data.tipoProcedimiento || "Sin tipo",
      estado: data.estado || "Desconocido",
      teletrabajado: data.teletrabajado || "NO",
      idMacroproceso: data.idMacroproceso || 0,
      idEjeEstrategico: data.idEjeEstrategico || 0,
      tipoDocumento: data.tipoDocumento || "Sin documento",
      nombreProcedimiento: data.nombreProcedimiento || "No especificado",
      apoyoTecnologico: data.apoyoTecnologico || "No",
      anioActualizacion: data.anioActualizacion || "Sin año",
    }));
  };


  return (
    <div>
      <div className="container py-4">
        {/* First Row */}

        <div className="col-md-3">
          <div className="card card-custom">
            <label htmlFor="idEje" className="form-label">
              Seleccionar Eje
            </label>
            <select id="idEje" className="form-select">
              <option value="">Ninguna</option>
              {ejeData.map((item) => (
                <option value={item.idEje}> {item.nombreEjeEstrategico.slice(0,20)} </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-custom">
            <label htmlFor="idArea" className="form-label">
              Seleccionar Área
            </label>
            <select id="idArea" className="form-select">
              <option value="" >Ninguna</option>
              {areaData.map((item) => (
                <option value={item.idArea}> {item.nombreArea} </option>
              ))}

              
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-custom">
            <label htmlFor="idDependencia" className="form-label">
              Seleccionar Dependencia
            </label>
            <select id="idDependencia" className="form-select">
            <option value="" >Ninguna</option>
              {dependenciaData.map((item) => (
                <option value={item.idDependencia}> {item.nombreDependencia} </option>
              ))}
            </select>
          </div>
        </div>

        {/* Second Row */}
        <div className="col-md-4">
          <div className="card card-custom">
            <label htmlFor="idMacroproceso" className="form-label">
              Seleccionar Macroproceso
            </label>
            <select id="idMacroproceso" className="form-select">
            <option value="" >Ninguna</option>
              {macroProcData.map((item) => (
                <option value={item.idMacroproceso}> {item.nombreMacroproceso} </option>
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
                name="teletrabajado"
                value="SI"
              />
              <label htmlFor="teletrabajadoSi">SI</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="teletrabajadoNo"
                name="teletrabajado"
                value="NO"
              />
              <label htmlFor="teletrabajadoNo">NO</label>
            </div>
          </div>
        </div>
        

        {/* Third Row */}

        <div className="col-md-4">
          <div className="card card-custom">
            <label className="form-label">Tipo Procedimiento</label>
            <div>
              <input
                type="checkbox"
                id="procedimientoCritico"
                name="tipoProcedimiento"
                value="Crítico"
              />
              <label htmlFor="procedimientoCritico">Critico</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="procedimientoNoCritico"
                name="tipoProcedimiento"
                value="No Critico"
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
              />
              <label htmlFor="estadoOficializado">Oficializado</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="estadoNoOficializado"
                name="estado"
                value="No Oficializado"
              />
              <label htmlFor="estadoNoOficializado">No Oficializado</label>
            </div>
          </div>
        </div>

        {/* Fourth Row */}

        
      </div>
      <div className="contenedorTabla">
        <Tabla dataf = { procedimientosData }/>
      </div>
    </div>
  );
}

export default Principal;
