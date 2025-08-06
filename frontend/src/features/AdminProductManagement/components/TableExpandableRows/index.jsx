import React, { useState } from "react";
import styles from "./styles.module.css";

const Table = ({ columns, data }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          {columns.map(({ header }) => (
            <th key={header} className={styles.headerCell}>{header}</th>
          ))}
          <th className={styles.headerCell}>Expand</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <React.Fragment key={row.id}>
            {/* Main Row */}
            <tr className={styles.data}>
              {columns.map(({ key, render }, i) => (
                <td key={i} className={styles.dataCell}>
                  {render ? render(row) : row[key]}
                </td>
              ))}
              <td className={styles.dataCell}>
                <button 
                  className={styles.expandButton}
                  onClick={() => toggleRow(row.id)}
                >
                  {expandedRows.includes(row.id) ? "▲" : "▼"}
                </button>
              </td>
            </tr>

            {/* Expanded Row */}
            {expandedRows.includes(row.id) && row.variants?.length > 0 && (
              <tr className={styles.expandedRow}>
                <td colSpan={columns.length + 1}>
                  <table className={styles.subTable}>
                    <thead>
                      <tr>
                        <th>Size (ml)</th>
                        <th>Price ($)</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {row.variants.map((v, i) => (
                        <tr key={i}>
                          <td>{v.size_ml}</td>
                          <td>{v.price}</td>
                          <td>{v.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
