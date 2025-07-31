import React from "react";
import styles from "./index.module.css";

const offers = [
  {
    img: "https://png.pngtree.com/png-clipart/20221022/ourmid/pngtree-red-delivery-car-box-flat-illustration-png-image_6381211.png",
    title: "Free Delivery",
    desc: "Enjoy fast and free shipping on all your orders, no minimum required.",
  },
  {
    img: "https://betpokies.org/media/pages/cashback-bonus/3104e340f0-1745489447/cashback.svg",
    title: "Secure Payments",
    desc: "All transactions are protected and encrypted for your peace of mind.",
  },
  {
    img: "https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/achievement-award-medal-icon.svg",
    title: "Quality Guarantee",
    desc: "We offer only premium, high-quality products that meet our standards.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/256/3306/3306014.png",
    title: "24/7 Customer Support",
    desc: "Our team is always here to help — anytime, any day of the week.",
  },
];

const OfferSection = () => {
  return (
    <section className={styles.offerSection}>
      <h2>What We Offer!</h2>
      <div className={styles.cardContainer}>
        {offers.map((offer, index) => (
          <div className={styles.card} key={index}>
            <img src={offer.img} alt={offer.title} className={styles.img} />
            <h4>{offer.title}</h4>
            <p>{offer.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferSection;
