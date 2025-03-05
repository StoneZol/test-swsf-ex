import { Table } from "@mantine/core";
import styles from "./work-table.module.scss";
import useWorkTable from "./use-work-table";
import { useGetDataTableQuery } from "../../../store/api/work-table-api-slice";

export default function WorkTable() {

const {data: startData ,isLoading, isError} = useGetDataTableQuery();

const { renderRows, data} = useWorkTable(startData ?? [], isLoading)

if (isLoading) {
  return <div>Загрузка...</div>;
}

if (isError) {
  return <div>Ошибка при загрузке данных</div>;
}

return (
    <Table className={`hierarchical-table ${styles.main_table}`}>
      <thead>
        <tr className={styles.table_head_row}>
          <th>Уровень</th>
          <th>Наименование работ</th>
          <th>Основная з\п</th>
          <th>Оборудование</th>
          <th>Накладные расходы</th>
          <th>Сметная прибыль</th>
        </tr>
      </thead>
      <tbody>{renderRows(data)}</tbody>
    </Table>
  );
}