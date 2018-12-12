import { Nmdb, Schema } from '@s4p/nmdb';
import { getConnectionToken, getModelToken } from './common/mongoose.utils';
import { DEFAULT_DB_CONNECTION } from './mongoose.constants';

export function createMongooseProviders(
  connectionName: string = DEFAULT_DB_CONNECTION,
  models: { name: string; schema: Schema; collection?: string }[] = [],
) {
  const providers = (models || []).map(model => ({
    provide: getModelToken(model.name),
    useFactory: (connection: Nmdb) =>
      connection.model(model.name, model.schema, {
        collName: model.collection,
      }),
    inject: [
      connectionName === DEFAULT_DB_CONNECTION
        ? DEFAULT_DB_CONNECTION
        : getConnectionToken(connectionName),
    ],
  }));
  return providers;
}
