import { join } from "path";
import { ConnectionOptions } from "typeorm";

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'books',
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  synchronize: false,
  migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default ormConfig;