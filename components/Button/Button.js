import clsx from "clsx";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      // className={styles["button"]}
      {...{ ...props, className: clsx(styles.button, props?.className) }}
    />
  );
};

export default Button;
