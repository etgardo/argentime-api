import { UserEntity } from '@common/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';

@Entity('admins') //This decorator tells TYPEORM to automatically create the table "admins" in database
export class AdminEntity extends UserEntity {
  @Column({ type: 'simple-array', nullable: false })
  roles: string[];

  @Column({ type: 'bool', default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      //if the field is empty, it does nothing
      return;
    }
    this.password = await hash(this.password, 10);
    this.title = `${this.name || ''} ${this.lastName || ''}`;
  }
}
