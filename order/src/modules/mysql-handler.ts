import MySQL from 'mysql';

export type MySQLBindings = { [key: string]: string | number | null };

export default class MySQLHandler {
  pool: MySQL.Pool;

  constructor(settings: MySQL.PoolConfig) {
    this.pool = MySQL.createPool(settings);
  }

  queryPromise(query: string, values?: MySQLBindings, oneResult = false) {
    let mysqlQuery = query;

    const promise = new Promise<any>((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          if (connection) connection.release();
          console.log(`SQL error: ${err}`);
          reject(err);

          return;
        }

        if (values !== undefined) {
          mysqlQuery = mysqlQuery.replace(/:(\w+)/g, (txt, key) => {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
              return connection.escape(values[key]);
            }
            return txt;
          });
        }

        connection.query(mysqlQuery, [], (err, results) => {
          if (connection) connection.release();
          if (err) {
            console.log(err);
            reject(err);
          }
          if (!oneResult) {
            resolve(results);
          } else if (results !== undefined && results.length > 0) {
            resolve(results[0]);
          }
          resolve(false);
        });
      });
    });

    promise.catch((error) => { throw new Error(error); });

    return promise;
  }

  oneQueryPromise(query: string, values?: MySQLBindings) {
    return this.queryPromise(query, values, true);
  }
}
