import styles from "./styles.module.css";
const Table = ({ columns, data }) => (
 <table className={styles.table}>
  <thead>
    <tr className={styles.header}>
      {columns.map(({ header }) => (
        <th key={header} className={styles.headerCell}>{header}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {data.map((row) => (
      <tr key={row.id} className={styles.data}>
        {columns.map(({ key, render }, i) => (
          <td key={i} className={styles.dataCell}>
            {render ? render(row) : row[key]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

);

export default Table;