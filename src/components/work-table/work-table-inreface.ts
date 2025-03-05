export interface TaskProps {
    id: number;
      rowName: string;
      salary: number;
      overheads: number;
      estimatedProfit: number;
      equipmentCosts: number;
      child?: TaskProps[];
      machineOperatorSalary?: number;
      mainCosts?: number;
      materials?: number;
      mimExploitation?: number;
      supportCosts?: number;
      total?: number;
      parentId?: number | null;
    }