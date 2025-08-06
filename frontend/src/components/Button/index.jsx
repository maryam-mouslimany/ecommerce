import styles from "./index.module.css";
import clsx from "clsx";

export const Button = ({
  label,
  onClick,
  variant = "",
  size = "",
  outline = false,
  iconLeft = null,
  type = "button",
  disabled = false,
  ...props
}) => {
  const className = clsx(
    styles.button,
    variant && styles[`button--${variant}`],
    size && styles[`button--${size}`],
    outline && styles["button--outline"],
    iconLeft && styles["button--iconLeft"],
    disabled && styles["button--disabled"]
  );
  return (
    <button 
      className={className} 
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {iconLeft && <div className={styles.iconLeft}>{iconLeft}</div>}
      {label}
    </button>
  );
};
