import { gql } from 'apollo-angular';
import { parseFields } from './graphql-fields-parser';
import { TableFields } from './graphql-schema';

export const generateQuery = (table: string, fields: TableFields) => {
  return gql`
        query ${table}_query (   
            $distinct_on: [${table}_select_column!]
            $where: ${table}_bool_exp
            $limit: Int
            $offset: Int
            $order_by: [${table}_order_by!]
        ) {
            ${table} (distinct_on: $distinct_on, where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
                ${parseFields(fields)}
            } 
        }
    `;
};

export const generateQueryById = (table: string, fields: TableFields) => {
  return gql`
    query ${table}_query_by_id ($id: Int!) {
        ${table}_by_pk(id: $id) {
            ${parseFields(fields)}
      }
    }
  `;
};
