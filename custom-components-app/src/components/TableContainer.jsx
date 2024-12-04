import React, { useState, useMemo } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const TableContainer = ({ 
  data = [], 
  columns = [], 
  styles = {} 
}) => {
  // Memoize the normalization of columns and data
  const { normalizedColumns, safeData } = useMemo(() => {
    // Ensure columns and data are always arrays
    const processedColumns = Array.isArray(columns) ? columns : [];
    const processedData = Array.isArray(data) ? data : [];

    // Normalize columns to ensure each has a key
    const normalizedColumns = processedColumns.map((col, index) => ({
      key: col.key || `column_${index}`,
      header: col.header || `Column ${index + 1}`,
      filterable: col.filterable || false,
      sortable: col.sortable !== undefined ? col.sortable : true
    }));

    return {
      normalizedColumns,
      safeData: processedData
    };
  }, [columns, data]);

  // Initialize sortConfig with default sorting for each column
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: 'asc'
  });
  
  const [filters, setFilters] = useState(
    normalizedColumns.reduce((acc, column) => ({
      ...acc, 
      [column.key]: ""
    }), {})
  );

  // Sorting Logic
  const sortedData = useMemo(() => {
    if (safeData.length === 0) return [];

    if (!sortConfig.column) return safeData;

    return [...safeData].sort((a, b) => {
      const valueA = a[sortConfig.column];
      const valueB = b[sortConfig.column];

      // Handle null/undefined values
      if (valueA == null) return 1;
      if (valueB == null) return -1;

      // Compare values
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortConfig.direction === 'asc' 
          ? valueA - valueB 
          : valueB - valueA;
      }

      // String comparison
      const stringA = String(valueA).toLowerCase();
      const stringB = String(valueB).toLowerCase();
      
      if (stringA < stringB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (stringA > stringB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [safeData, sortConfig]);

  // Filtering Logic
  const filteredData = useMemo(() => {
    return sortedData.filter((row) =>
      Object.entries(filters).every(([key, value]) =>
        value
          ? String(row[key] || '').toLowerCase().includes(value.toLowerCase())
          : true
      )
    );
  }, [sortedData, filters]);

  // Sort Handler
  const handleSort = (column) => {
    // Check if column is sortable
    const columnConfig = normalizedColumns.find(col => col.key === column);
    if (columnConfig && columnConfig.sortable === false) return;

    // If sorting the same column, toggle direction
    // If sorting a new column, start with ascending
    setSortConfig(prev => ({
      column: column,
      direction: prev.column === column && prev.direction === 'asc' 
        ? 'desc' 
        : 'asc'
    }));
  };

  // Filter Handler
  const handleFilter = (column, value) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  };

  // Default styles with override option
  const defaultStyles = {
    header: {
      fontSize: '14px',
      backgroundColor: '#f4f4f4',
      color: '#333',
      ...styles?.header
    },
    body: {
      fontSize: '13px',
      backgroundColor: 'white',
      color: '#000',
      ...styles?.body
    }
  };

  return (
    <div style={{ 
      fontFamily: "Arial, sans-serif", 
      margin: "20px",
      ...defaultStyles.body
    }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
          fontSize: defaultStyles.body.fontSize,
          color: defaultStyles.body.color,
          backgroundColor: defaultStyles.body.backgroundColor
        }}
      >
        <TableHeader
          columns={normalizedColumns}
          sortConfig={sortConfig}
          onSort={handleSort}
          onFilter={handleFilter}
          filters={filters}
          headerStyles={defaultStyles.header}
        />
        <TableBody 
          data={filteredData} 
          columns={normalizedColumns}
          bodyStyles={defaultStyles.body}
        />
      </table>
    </div>
  );
};

export default TableContainer;