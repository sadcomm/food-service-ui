import { TableFields } from './graphql-schema';

export const parseFields = (fields: TableFields) => {
  fields = fields.map((field) => {
    if (!!field && typeof field === 'object') {
      field = field.relName + '{' + field.relFields.join(',') + '}';
    }
    return field;
  });
  return fields.join(',');
};
