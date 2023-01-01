import { gql } from 'apollo-angular';
import { parseFields } from './graphql-fields-parser';
import { TableFields } from './graphql-schema';

export const generateUpsertMutation = (table: string, fields: TableFields) => {
  return gql`
        mutation ${table}_mutation (   
          $objects: [${table}_insert_input!]!, $onConflict: ${table}_on_conflict
        ) {
            insert_${table} (objects: $objects, on_conflict: $onConflict) {
              affected_rows
              returning {
                ${parseFields(fields)}
              }
            } 
        }`;
};
