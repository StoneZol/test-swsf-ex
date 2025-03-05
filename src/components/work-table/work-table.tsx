import { Table } from "@mantine/core";
import styles from "./work-table.module.scss";
import useWorkTable from "./use-work-table";
import { TaskProps } from "./work-table-inreface";

const initialData: TaskProps[] = [
  {
    id: 1,
    rowName: "Южная строительная площадка",
    salary: 0,
    overheads: 0,
    estimatedProfit: 0,
    equipmentCosts: 0,
    child: [
        {
            id: 3,
            rowName: "Южная строительная площадка",
            salary: 0,
            overheads: 0,
            estimatedProfit: 0,
            equipmentCosts: 0,
            child: [
              {
                id: 4,
                rowName: "Южная строительная площадка",
                salary: 0,
                overheads: 0,
                estimatedProfit: 0,
                equipmentCosts: 0,
                child: [              {
                    id: 5,
                    rowName: "Южная строительная площадка",
                    salary: 0,
                    overheads: 0,
                    estimatedProfit: 0,
                    equipmentCosts: 0,
                    child: [],
                  },],
              },
              {
                id: 10,
                rowName: "Южная строительная площадка",
                salary: 0,
                overheads: 0,
                estimatedProfit: 0,
                equipmentCosts: 0,
                child: [
                  {
                    id: 33,
                    rowName: "Южная строительная площадка",
                    salary: 0,
                    overheads: 0,
                    estimatedProfit: 0,
                    equipmentCosts: 0,
                    child: [],
                  },
                ],
              },
            ],
          },
          

      {
        id: 2,
        rowName: "Южная строительная площадка",
        salary: 0,
        overheads: 0,
        estimatedProfit: 0,
        equipmentCosts: 0,
        child: [],
      },
    ],
  },
];

export default function WorkTable() {

const { renderRows, data} = useWorkTable(initialData)

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