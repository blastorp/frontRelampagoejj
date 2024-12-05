import React, { useMemo, useState } from "react";
import '../styles/estiloTabla.css'
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
const Tabla = ({ dataf }) => {
   
    const columns = [
      {
        name: "Nombre Procedimiento",
        selector: row => row.nombreProcedimiento || "No especificado", // Debe coincidir con los nombres reales en los datos.
        sortable: true,
        grow: 4,
      },
      {
        name: "Área",
        selector: row => row.nombreArea || "No especificado",
        sortable: true,
        grow: 1,
      },
      {
        name: "Dependencia",
        selector: row => row.nombreDependencia|| "No especificado",
        sortable: true,
        grow: 2,
      },
      {
        name: "Macro Proc.",
        selector: row => row.nombreMacroproceso || "No especificado",
        sortable: true,
        grow: 1,
      },
      {
        name: "Eje",
        selector: row => row.nombreEjeEstrategico || "No especificado",
        sortable: true,
        grow: 2,
      },
      {
        name: "Año Act.",
        selector: row => row.anioActualizacion || "No especificado",
        sortable: true,
        grow: 2,
      },
      {
        name: "Teletrabajado",
        selector: row => row.teletrabajado || "No especificado",
        sortable: true,
        grow: 2,
      },
      {
        name: "Tipo",
        selector: row => row.tipoProcedimiento || "No especificado",
        sortable: true,
        grow: 2,
      },
      {
        name: "Estado",
        selector: row => row.estado || "No especificado",
        sortable: true,
        grow: 2,
      },
    ];
  
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  
    const filteredItems = dataf && Array.isArray(dataf)
      ? dataf.filter((item) =>
          JSON.stringify(item)
            .toLowerCase()
            .includes(filterText.toLowerCase())
        )
      : [];
  
    const subHeaderComponent = useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText("");
        }
      };
  
      return (
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      );
    }, [filterText, resetPaginationToggle]);
  
    return (
      <DataTable
        title="Lista Procedimientos"
        columns={columns}
        data={ dataf }
        defaultSortField="name"
        striped
        pagination
        subHeader
        // subHeaderComponent={subHeaderComponent}
      />
    );
  };
  
  export default Tabla;
  