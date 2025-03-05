import { ReactNode, useEffect, useState } from "react";
import { EditedRow, StaticRow } from "./table-modules/rows";
import { ControlButtons } from "./table-modules/control-buttons";
import { TaskProps } from "./work-table-inreface";
import { useCreateRowTableMutation, useDeleteRowTableMutation, useUpdateRowTableMutation } from "../../../store/api/work-table-api-slice";
import { buildHierarchyMap, getConnectors } from "./helpers";

export default function useWorkTable(initialData:TaskProps[], isLoading: boolean){
    const [data, setData] = useState(initialData ?? []);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedTask, setEditedTask] = useState<TaskProps | null>(null)
    const [isFull, setIsFull] = useState(false)
    const [isNew, setIsNew] = useState(false)

    const [createRow] = useCreateRowTableMutation();
    const [deleteRow] = useDeleteRowTableMutation();
    const [updateRow] = useUpdateRowTableMutation()

    useEffect(() => {
      if (initialData.length > 0) {
        setData(initialData);
        setIsFull(true)
        return
      }      
    }, [initialData]);

    useEffect(() => {
      if (!isLoading && !isFull && data.length === 0) {
        addTask(null); // Добавляем задачу только один раз, когда загрузка завершена и данных нет
      }
      if (data.length > 0) {
        setEditingId(null)
        setIsFull(true)
      }
    }, [isLoading, isFull]);

    useEffect(() => {
      if (data.length === 0) {
        setIsFull(false)
      }
    }, [data]);

    let globalIndex = 0;
  
    const objMap = buildHierarchyMap(data);
  
    const updateTaskTree = ( tasks: TaskProps[], taskId: number | null, updateFn: (task: TaskProps) => TaskProps): TaskProps[] => {
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
      setEditingId(id)
      setData((data) =>
      updateTaskTree(data, id, (task) => ({ ...task, [field]: value })));
      if (editedTask?.id === id) {
        setEditedTask((prev) => {
          if (prev) {
            return { ...prev, [field]: value };
          }
          return prev;
        });
      }
    };

    const handleSave = async () => {
      if (!editedTask) return;
      if (isNew){
        try {
          const response = await createRow(editedTask);
          if ('data' in response && response.data) {
            const newId = response.data.current.id;
            setData((prevData) =>
              updateTaskTree(prevData, editedTask.id, (task) => ({
                ...task,
                id: newId,
              }))
            );
      
            setEditedTask((prev) => {
              const updatedTask = prev ? { ...prev, id: newId } : prev;
              return updatedTask;
            });
      
            setEditingId(null);
            setIsNew(false)
            setIsFull(true)
          }
        } catch (error) {
          console.error("Ошибка при сохранении задачи:", error);
        }
        return
      }
        try {
          const response = await updateRow({ rID:editingId!, body: editedTask });
          if ('data' in response && response.data) {
            const newId = response.data.current.id;
            setData((prevData) =>
              updateTaskTree(prevData, editedTask.id, (task) => ({
                ...task,
                id: newId,
              }))
            );
    
            setEditedTask((prev) => {
              const updatedTask = prev ? { ...prev, id: newId } : prev;
              return updatedTask;
            });
    
            setEditingId(null);
            setIsNew(false);
            setIsFull(true)
          }
        } catch (error) {
          console.error("Ошибка при сохранении задачи:", error);
        }
  };
    
  const addTask = (parentId: number | null) => {

    if (editingId !== null ) return

    setIsNew(true)

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
        total: 0,
        parentId: parentId ?? null,
    };
  
    setEditingId(newTask.id);
    setEditedTask(newTask);

    setData((data) => {
      if (!data.length) {
        return [newTask];
      }
      return updateTaskTree(data, parentId, (task) => ({
        ...task,
        child: [...(task.child ?? []), newTask],
      }));
    });
  };

  const doubleClick = (task: TaskProps) => {

    if (editingId !== null ) return

    setEditingId(task.id)
    setEditedTask(task)
    setIsNew(false)
  }
  
  const removeTask = (id : number) => {
    if (editingId !== null ) return
    if (!confirm("Подтвердите удаление")) return;
      deleteRow(id)
        .then(() => {
        const filterTasks = (tasks : TaskProps[]) : TaskProps[] => tasks
        .filter((task) => task.id !== id)
        .map((task) => ({...task, child: task.child
                            ? filterTasks(task.child)
                            : []
          }));
  
        setData((data)=> filterTasks(data));
        })
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
                      onDoubleClick={() => doubleClick(task)}
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