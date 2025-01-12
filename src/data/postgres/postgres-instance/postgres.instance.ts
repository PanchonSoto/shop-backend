import { PostgresDatabase } from '../postgres-database';
import { envs } from '../../../config/envs';

export const postgresDBInstance = new PostgresDatabase({
  database: envs.POSTGRES_DB,
  username: envs.POSTGRES_USER,
  password: envs.POSTGRES_PASSWORD,
  host: envs.POSTGRES_HOST,
});
