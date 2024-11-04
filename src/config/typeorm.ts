import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({
  path: './.env.development',
});

// const config = {
//   type: 'postgres',
//   database: process.env.POSTGRES_DATABASE,
//   host: process.env.POSTGRES_HOST,
//   port: process.env.DB_PORT as unknown as number,
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   autoLoadEntities: true,
//   // Para desarrollo
//   // synchronize: true,
//   // Para produccion se debe hacer la migración manual
//   synchronize: false,
//   logging: true,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations:["dist/migrations/*{.ts,.js}"],
// /*   ssl: {
//     rejectUnauthorized: false,  // Importante para evitar problemas con certificados autofirmados
//   }, */
// };

const config = {
  type: 'postgres',
  url: process.env.POSTGRES_URL, // Usar la URL de conexión completa
  autoLoadEntities: true,
  synchronize: false, // Ajusta a true solo en desarrollo; en producción usa migraciones
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};


export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
