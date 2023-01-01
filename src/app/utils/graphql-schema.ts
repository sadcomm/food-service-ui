export interface ITableRelation {
  relName: string;
  relFields: (string | ITableRelation)[];
}

export type TableFields = (string | ITableRelation)[];
