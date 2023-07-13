import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

let AutoIncrement: any;

export function getAutoIncrement(connection: Connection) {
  if (AutoIncrement === undefined) {
    AutoIncrement = AutoIncrementFactory(connection);
  }
  return AutoIncrement;
}

export function getAutoIncrementOpts(name: string) {
  return {
    id: name + '_index',
    inc_field: 'index',
    start_req: 1,
  };
}
