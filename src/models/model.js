import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    //Probar si funciona
    this.id = "id_"+table.toLowerCase();
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    let queryResult = this.pool.query(query)
    let tableName = this.table
    console.log("Normal select prints")
    console.log(queryResult)
    console.log(tableName)
    console.log(typeof(queryResult))

    return queryResult;
  }
  async selectAll(clause) {
    let query = `SELECT * FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }
  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO "${this.table}"(${columns})
          VALUES (${values})
          RETURNING ${this.id},${columns}
      `;
    console.log("Normal select prints")
    console.log("columns")
    console.log(columns)
    console.log("values")
    console.log(values)
    console.log("table")
    console.log(this.table)
    console.log("the query:")
    console.log(query)
    return this.pool.query(query);
  }
  async update(columns, values, conditions) {
    //Verificar que funcione
    let single_column
    let single_value
    let query = `
          UPDATE ${this.table}
          SET `
    for (let i = 0; i < columns.length; i++) {
      single_column = columns[i];
      single_value = values[i];
      query+= `${single_column} = ${single_value}, `
    }
    query+= `WHERE ${conditions}`
    return this.pool.query(query);
  }
  async delete(conditions) {
    const query = `
          DELETE FROM ${this.table}
          WHERE ${conditions}
          RETURNING *;
      `;
    return this.pool.query(query);
  }

}

export default Model;