import { ReactNode, useState } from "react";
import styles from "./work-table.module.scss"
import { EditedRow, StaticRow } from "./table-modules/rows";
import { ControlButtons } from "./table-modules/control-buttons";
import { TaskProps } from "./work-table-inreface";

function buildHierarchyMap(tasks: TaskProps[], depth = 0, activeLevels: number[] = []): number[][] {
    return tasks.flatMap((task, index, array) => {
      const isLast = index === array.length - 1;
      const newActiveLevels = [...activeLevels];
  
      if (depth === 0 && index === 0) {
        // Корневой объект всегда [-1]
        return [[-1], ...buildHierarchyMap(task.child ?? [], depth + 1, newActiveLevels)];
      }
  
      // Генерация текущей строки на основе активных уровней
      const row = newActiveLevels.map((v) => v).concat(2);
      const result = [row];
  
      // Если есть потомки, добавляем новый уровень
      if ((task.child ?? []).length > 0) {
        newActiveLevels.push(isLast ? 0 : 1);
        result.push(...buildHierarchyMap(task.child ?? [], depth + 1, newActiveLevels));
      }
  
      return result;
    });
  }

function getConnectors(hierarchyMap: number[][], rowIndex: number) {
    return (
      <div className={styles.list_connection}>
        {
          hierarchyMap[rowIndex].map((value, index) => {
            if (value === -1) return null;
            if (value === 0)
              return <div key={index} className={styles.connect}></div>;
            if (value === 1)
              return <div key={index} className={styles.connect}>
                  <div className={styles.centerVerticalLine}></div>
              </div>;
            if (value === 2)
              return (
                <div key={index} className={styles.connect}>
                  <div className={styles.centerHorizontalHalfLine}></div>
                  <div className={styles.centerVerticalLine}></div>
                </div>
              );
            return null;
          })
        }
      </div>
    )
  }

export default function useWorkTable(initialData:TaskProps[]){
    const [data, setData] = useState(initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
  
    let globalIndex = 0;
  
    const objMap = buildHierarchyMap(data);
  
    const updateTaskTree = ( tasks: TaskProps[], taskId: number, updateFn: (task: TaskProps) => TaskProps): TaskProps[] => {
      return tasks.map((task) => {
          if (task.id === taskId) {
              return updateFn(task);
          }
  
          if (task.child) {
              return { ...task, child: updateTaskTree(task.child, taskId, updateFn) };
          }
  
          return task;
      });
  };
  
  
    const handleChange = (id: number, field: keyof TaskProps, value: number | string) => {
      setData((data) =>
      updateTaskTree(data, id, (task) => ({ ...task, [field]: value }))
  );
    };
  
  
    const handleSave = () => {
      setEditingId(null);
    };
  
  
  const addTask = (parentId: number) => {
    const newTask: TaskProps = {
        id: Date.now(),
        rowName: "",
        salary: 0,
        overheads: 0,
        estimatedProfit: 0,
        equipmentCosts: 0,
        child: [],
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
        total: 0
    };
  
    setEditingId(newTask.id);
    setData((data) =>
        updateTaskTree(data, parentId, (task) => ({...task, child: [...(task.child ?? []), newTask]}))
    );
  };
  
  const removeTask = (id : number) => {
      if (!confirm("Подтвердите удаление")) 
          return;
      const filterTasks = (tasks : TaskProps[]) : TaskProps[] => tasks
          .filter(
              (task) => task.id !== id
          )
          .map((task) => ({
              ...task,
              child: task.child
                  ? filterTasks(task.child)
                  : []
          }));
  
      setData(filterTasks(data));
  };
  
  const renderRows = (tasks : TaskProps[], level = 0, parentHasChild : boolean[] = []): ReactNode[] => tasks.flatMap((task) => {
      const currentHasChild = !!task.child && task.child.length > 0;
      const newParentHasChild = [
          ...parentHasChild.slice(0, level),
          currentHasChild
      ];
      const currentGlobalIndex = globalIndex++;
      return [
          editingId === task.id
              ? (
                  <EditedRow
                      key={task.id}
                      task={task}
                      handleChange={handleChange}
                      handleSave={handleSave}
                      level={level}>
                      {getConnectors(objMap, currentGlobalIndex)}
                      <ControlButtons taskID={task.id} addTask={addTask} removeTask={removeTask}/>
                  </EditedRow>
              ) : (
                  <StaticRow
                      key={task.id}
                      task={task}
                      onDoubleClick={() => setEditingId(task.id)}
                      level={level}>
                      {getConnectors(objMap, currentGlobalIndex)}
                      <ControlButtons taskID={task.id} addTask={addTask} removeTask={removeTask}/>
                  </StaticRow>
              ),
          ...( task.child
                  ? renderRows(task.child, level + 1, newParentHasChild)
                  : [] )
      ];
  });
  return {
    renderRows,
    data
  }
}