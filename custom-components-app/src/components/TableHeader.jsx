import React from "react";
import FilterInput from "./FilterInput";

const TableHeader = ({
  columns = [],
  sortConfig,
  onSort,
  onFilter,
  filters,
  headerStyles = {},
}) => {
  if (columns.length === 0) return null;

  return (
    <thead
      style={{
        fontSize: headerStyles.fontSize,
        backgroundColor: headerStyles.backgroundColor,
        color: headerStyles.color,
      }}
    >
      <tr>
        {columns.map((column) => (
          <th
            key={column.key || "column"}
            style={{
              padding: "12px",
              borderBottom: "2px solid #e0e0e0",
              textAlign: "left",
              cursor: "pointer",
              userSelect: "none",
              position: "relative",
              fontSize: headerStyles.fontSize,
              backgroundColor: headerStyles.backgroundColor,
              color: headerStyles.color,
            }}
          >
            <div
              onClick={() => onSort(column.key)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {column.header || "Column"}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Always show an icon, default to desc when not sorted */}
                {sortConfig.column === column.key
                  ? sortConfig.direction === "asc"
                    ? " ▲"
                    : " ▼"
                  : " ▼"}
              </div>
            </div>
            {column.filterable && (
              <FilterInput
                column={column}
                onFilter={onFilter}
                value={filters?.[column.key] || ""}
                headerStyles={headerStyles}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
