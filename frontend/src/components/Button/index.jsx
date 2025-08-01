import styles from "./index.module.css";
import clsx from "clsx";

export const Button = ({
  label,
  onClick,
  variant = "",
  size = "",
  outline = false,
  iconLeft = null,
}) => {
  const className = clsx(
    styles.button,
    variant && styles[`button--${variant}`],
    size && styles[`button--${size}`],
    outline && styles["button--outline"],
    iconLeft && styles["button--iconLeft"]
  );
  return (
    <button className={className} onClick={onClick}>
      {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}
      {label}
    </button>
  );
};
