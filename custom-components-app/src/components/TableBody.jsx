import React from "react";

const TableBody = ({ 
  data = [], 
  columns = [],
  bodyStyles = {}
}) => {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr 
          key={rowIndex}
          style={{
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: bodyStyles.backgroundColor,
            color: bodyStyles.color,
            fontSize: bodyStyles.fontSize
          }}
        >
          {columns.map((column) => (
            <td 
              key={column.key} 
              style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: bodyStyles.fontSize,
                color: bodyStyles.color
              }}
            >
              {row[column.key] !== undefined ? row[column.key] : 'N/A'}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;