import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { validationMessages } from '@_constants';
import { IsNotEmpty } from 'class-validator';

export abstract class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false }) //The Column decorator is for setting attributes in the database table
  @IsNotEmpty({ message: validationMessages.TITLE_NOT_EMPTY })
  title!: string;

  @Column({ type: 'varchar', length: 100, nullable: false }) //The docs enitities in -> https://typeorm.io/entities
  name!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: false })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 128, nullable: true, select: false })
  password?: string | null;

  @Column({ name: 'refresh_token', type: 'text', nullable: true })
  refreshToken: string;
}
