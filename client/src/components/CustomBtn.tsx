import type { ICustomBtn } from "../interfaces/ICustomBtn";
import styles from "./customBtn.module.scss";

export default function MyButton({ buttonText, onClick, disabled }: ICustomBtn) {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.custom_btn}>
      {buttonText}
    </button>
  );
}
