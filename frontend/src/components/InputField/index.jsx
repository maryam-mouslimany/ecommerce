import styles from "./index.module.css";

export const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = true,
  autoComplete,
}) => {
  return (
    <>
      <label className={styles.label}>
        {label}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.input}
          required={required}
          autoComplete={autoComplete}
        />
      </label>
    </>
  );
};
