import { ReactNode } from "react";
import styles from "./rows.module.scss"
import { TaskProps } from "../../work-table-inreface";

export interface EditedRowProps {
    task: TaskProps;
    children: ReactNode;
    level: number;
    handleChange: (id: number, field: keyof TaskProps, value: number | string) => void;
    handleSave: (id: number) => void;
  }

export default function EditedRow({ task, children, handleChange, handleSave, level }: EditedRowProps){
    return (
      <tr className={styles.table_row} onKeyDown={(e) => e.key === "Enter" && handleSave(task.id)}>
        <td className={styles.level} style={{ paddingLeft: `${level * 30}px`, position: "relative" }}>
          {children}
        </td>
        <td>
          <input type="text" value={task.rowName} onChange={(e) => handleChange(task.id, "rowName", e.target.value)} />
        </td>
        <td>
          <input type="number" value={task.salary} onChange={(e) => handleChange(task.id, "salary", Number(e.target.value))} />
        </td>
        <td>
          <input type="number" value={task.equipmentCosts} onChange={(e) => handleChange(task.id, "equipmentCosts", Number(e.target.value))} />
        </td>
        <td>
          <input type="number" value={task.overheads} onChange={(e) => handleChange(task.id, "overheads", Number(e.target.value))} />
        </td>
        <td>
          <input type="number" value={task.estimatedProfit} onChange={(e) => handleChange(task.id, "estimatedProfit", Number(e.target.value))} />
        </td>
      </tr>
    );
  };