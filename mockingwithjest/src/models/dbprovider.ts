import moment from 'moment';
import { insertChangelog, createChangelog } from './queries';
import DB, { dataBaseConfig } from './db';
import { ChangeType } from '../types';
const parseStatement = require('named-placeholders')();

class dbprovider {
  database: DB;
  constructor({ host, user, password, database, port }: dataBaseConfig) {
    this.database = new DB({
      host,
      user,
      password,
      database,
      port,
    });
  }
  /**
   * Checks id a given aws account ID exists in the aws_accounts table
   * @param id aws account id
   * @returns boolean returns true if the account exists, otherwise returns false
   */
  async isValidAWSAccountID(id: number) {
    this.database.query('USE aws_portal');
    const validAccount: any = await this.database.query(
      `SELECT * from aws_accounts where aws_account_ref = :id LIMIT 1`,
      {
        id,
      }
    );
    return validAccount.length > 0;
  }
  /**
   *
   * @param object item a configurationItem
   * @param String the type of configuration change that is to be persisted
   * @returns {OkPacket | MysqlError}
   */
  async insertChangelog(item: object, changeType: string) {
    const {
      awsRegion,
      resourceType,
      resourceId,
      configurationItemCaptureTime,
      configurationStateId,
      accountId,
    } = item;

    this.database.query('USE aws_config');
    console.log(accountId);
    await this.database.query(createChangelog, {
      resourceType,
      resourceId,
      resource_history_id: null,
      change_timestamp: moment(configurationItemCaptureTime).format('YYYY-MM-DD hh:mm:ss'),
      region: awsRegion,
      change_type: changeType,
      aws_account_id: 735412991161,
      diff: 'null',
      matched_resource_id: null,
      configuration_state_id: configurationStateId,
    });
  }
  /**
   * Executes an sql query
   * @param sql - sql to execute
   * @param object [vars] - variables to insert into sql query
   * @returns {(Array|OkPacket) }Array of results if select. status object if insert, update, or delete
   */
  async query(statement: string, vars?: object) {
    return await this.database.query(statement, vars);
  }
  async end() {
    return await this.database.end();
  }
}

export default dbprovider;
