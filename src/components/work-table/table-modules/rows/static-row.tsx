import { ReactNode } from "react";
import styles from "./rows.module.scss"
import { TaskProps } from "../../work-table-inreface";

 export interface StaticRowProps {
    task: TaskProps;
    children: ReactNode;
    onDoubleClick: (id: number) => void;
    level: number;
  }

 export default function StaticRow({ task, children, onDoubleClick, level }: StaticRowProps){
    return (
      <tr className={styles.table_row} onDoubleClick={() => onDoubleClick(task.id)}>
        <td className={styles.level} style={{ paddingLeft: `${level * 30}px` }}>
          {children}
        </td>
        <td>{task.rowName}</td>
        <td>{task.salary}</td>
        <td>{task.equipmentCosts}</td>
        <td>{task.overheads}</td>
        <td>{task.estimatedProfit}</td>
      </tr>
    );
  };