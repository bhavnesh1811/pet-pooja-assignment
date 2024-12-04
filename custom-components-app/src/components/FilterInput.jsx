import React from "react";

const FilterInput = ({ column, onFilter, value,headerStyles={} }) => {
  return (
    <input
      type="text"
      placeholder={`Filter ${column.header || "Column"}`}
      value={value}
      onChange={(e) => onFilter(column.key, e.target.value)}
      style={{
        width: "100%",
        marginTop: "8px",
        padding: "4px",
        border: "1px solid #e0e0e0",
        borderRadius: "4px",
        fontSize: headerStyles.fontSize,
      }}
    />
  );
};

export default FilterInput;
