import styles from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        Loading app...
        <progress />
      </div>
    </div>
  );
};
