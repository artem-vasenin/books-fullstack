import { join } from "path";

import ormConfig from "./typeorm.config";

const ormSeedConfig = {
  ...ormConfig,
  migrations: [join(__dirname, '../seeds/**/*{.ts,.js}')],
  cli: { migrationsDir: join(__dirname, '../seeds') },
};

console.log(ormSeedConfig);

export default ormSeedConfig;