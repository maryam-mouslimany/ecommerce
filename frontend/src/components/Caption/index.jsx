import styles from "./index.module.css";
import clsx from "clsx";

export const Caption = (variant) => {
  const className = clsx(
    styles.caption,
    variant && styles[`caption--${variant}`]
  );
  return <div className={className}>index</div>;
};
