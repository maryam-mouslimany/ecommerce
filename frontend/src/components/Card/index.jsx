import styles from "./index.module.css";
import { Button } from "../Button";
import { FaShoppingCart } from "react-icons/fa";
import { Caption } from "../Caption";
import perfumeImg from "../../assets/images/perfume.jpg";

export const Card = () => {
  return (
    <div className={styles.card}>
      <img src={perfumeImg} alt="Perfume" className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>Product Title</h2>
        <Caption variant="big" caption="$29.99" />
        <div className={styles.actions}>
          <Button
            label="Add to cart"
            variant="primary"
            iconLeft={<FaShoppingCart />}
          />
          <button type="button" className={styles.linkButton}>
            <Caption caption="view more" />
          </button>
        </div>
      </div>
    </div>
  );
};
