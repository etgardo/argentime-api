import { UserEntity } from '@mod-users/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';

@Entity('suscribers')
export class SuscriberEntity extends UserEntity {
  @Column({
    name: 'suscription_type',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  suscriptionType!: string;

  @Column({ name: 'suscription_expire', type: 'timestamp' })
  suscriptionExpire: Date;

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
