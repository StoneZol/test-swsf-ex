import { TaskProps } from "./work-table-inreface";
import styles from "./work-table.module.scss"

export function buildHierarchyMap(tasks: TaskProps[], depth = 0, activeLevels: number[] = []): number[][] {
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

export function getConnectors(hierarchyMap: number[][], rowIndex: number) {
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