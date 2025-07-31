import styles from "./index.module.css";
import clsx from "clsx";

export const Caption = ({ variant, caption }) => {
  const className = clsx(
    styles.caption,
    variant && styles[`caption--${variant}`]
  );
  return <div className={className}>{caption}</div>;
};
