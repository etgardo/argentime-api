import { ConfigService } from '@nestjs/config';
import { envNamesConf, requestMessages } from '@_constants';
import { DataSource } from 'typeorm';
import { AdminEntity } from '@mod-admins/entities';

export const setDefaultAdmin = async (config: ConfigService) => {
  const dataSource = new DataSource({
    type: 'mysql',
    host: config.get<string>(envNamesConf.DATABASE_HOST),
    port: parseInt(config.get<string>(envNamesConf.DATABASE_PORT), 10),
    username: config.get<string>(envNamesConf.DATABASE_USER),
    password: config.get<string>(envNamesConf.DATABASE_PASSWORD),
    database: config.get<string>(envNamesConf.DATABASE_NAME),
    entities: [AdminEntity],
  });
  dataSource
    .initialize()
    .then(async () => {
      const adminRepository =
        dataSource.getRepository<AdminEntity>(AdminEntity);
      const defaultAdmin = await adminRepository.findOneBy({
        email: config.get<string>(envNamesConf.DEFAULT_ADMIN_EMAIL),
      });

      if (!defaultAdmin) {
        const admin = adminRepository.create({
          email: config.get<string>(envNamesConf.DEFAULT_ADMIN_EMAIL),
          password: config.get<string>(envNamesConf.DEFAULT_ADMIN_PASSWORD),
          roles: [config.get<string>(envNamesConf.DEFAULT_ADMIN_ROLE)],
        });

        return await adminRepository.save(admin);
      }
    })
    .catch((err) => {
      console.error(requestMessages.ERROR_DATA_INIT, err);
    });
};
