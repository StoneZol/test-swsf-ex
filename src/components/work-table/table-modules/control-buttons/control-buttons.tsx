import { Create, Delete } from "../../../icons";
import styles from "./control.buttons.module.scss";

export interface ControlButtonsProps {
    taskID: number;
    addTask: (id: number) => void;
    removeTask: (id: number) => void;
  }

export default function ControlButtons({ taskID, addTask, removeTask }: ControlButtonsProps){
    return (
        <div className={styles.control_buttons}>
        <button className={styles.control_button} onClick={() => addTask(taskID)}>
          <Create />
        </button>
        <button className={styles.control_button} onClick={() => removeTask(taskID)}>
          <Delete />
        </button>
      </div>
    )
};