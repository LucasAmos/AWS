import mysql, { Connection } from 'mysql';
import util from 'util';
const parseStatement = require('named-placeholders')();

export type dataBaseConfig = {
  host: string;
  user: string;
  password: string;
  database: string | undefined;
  port: number;
};

/**
 * Creates an instance of a mysql DB connection
 * @class
 */
class DB {
  conn: Connection;

  /**
   * Represents a mysql database connection
   * @constructor
   * @param {dataBaseConfig} dataBaseConfigParameters object containing database configuration parameters
   * @param {string} dataBaseConfigParameters.host database host url
   * @param {string} dataBaseConfigParameters.user database user to connect as
   * @param {string} dataBaseConfigParameters.password password for user
   * @param {string | undefined} dataBaseConfigParameters.database database to connect to
   * @param {string} dataBaseConfigParameters.port database port
   */
  constructor({ host, user, password, database, port }: dataBaseConfig) {
    this.conn = mysql.createConnection({
      host,
      user,
      password,
      database,
      port,
    });
  }
  /**
   * Executes an sql query
   * @param sql - sql to execute
   * @param object [vars] - variables to insert into sql query
   * @returns {(Array|OkPacket) }Array of results if select. status object if insert, update, or delete
   */
  async query(statement: string, vars?: object) {
    const [sql, args] = parseStatement(statement, vars);
    // console.log(parseStatement(statement, vars));
    return util.promisify(this.conn.query).call(this.conn, sql, args);
  }
  /**
   * Closes a database connection
   */
  async end() {
    return util.promisify(this.conn.end).call(this.conn);
  }
}
export default DB;
