import styles from "./index.module.css";
import { Button } from "../Button";
import { FaShoppingCart } from "react-icons/fa";
import { Caption } from "../Caption";
import perfumeImg from "../../assets/images/perfume.jpg";

export const Card = ({ title, price, onViewMore }) => {
  return (
    <div className={styles.card}>
      <img src={perfumeImg} alt="Perfume" className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <Caption variant="big" caption={price} />
        <div className={styles.actions}>
          <Button
            label="Add to cart"
            variant="primary"
            iconLeft={<FaShoppingCart />}
          />
          <button
            type="button"
            className={styles.linkButton}
            onClick={onViewMore}
          >
            <Caption caption="view more" />
          </button>
        </div>
      </div>
    </div>
  );
};
