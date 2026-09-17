import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'ai-doctor' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id', comment: '用户ID' })
  userId: number;

  @Column('int', { name: 'system_id', nullable: true, comment: '所属系统id' })
  systemId: number | null;

  @Column('varchar', {
    name: 'username',
    nullable: true,
    comment: '用户名',
    length: 30,
  })
  username: string | null;

  @Column('int', { name: 'role_id', nullable: true, comment: '角色id' })
  roleId: number | null;

  @Column('tinyint', {
    name: 'is_super',
    nullable: true,
    comment: '超级管理员 0是 1否',
  })
  isSuper: number | null;

  @Column('varchar', {
    name: 'password',
    nullable: true,
    comment: '密码',
    length: 255,
  })
  password: string | null;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    comment: '电话号码',
    length: 11,
  })
  phone: string | null;

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    comment: '头像',
    length: 255,
  })
  avatar: string | null;

  @Column('tinyint', {
    name: 'sex',
    comment: '性别 0男 1女 2未知',
    default: () => "'0'",
  })
  sex: number;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱地址',
    length: 50,
  })
  email: string | null;

  @Column('int', { name: 'create_by', nullable: true, comment: '创建人' })
  createBy: number | null;

  @Column('int', { name: 'update_by', nullable: true, comment: '修改人' })
  updateBy: number | null;

  @Column('datetime', {
    name: 'create_time',
    nullable: true,
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date | null;

  @Column('datetime', {
    name: 'update_time',
    nullable: true,
    comment: '修改时间',
  })
  updateTime: Date | null;

  @Column('tinyint', {
    name: 'is_deleted',
    comment: '删除标记，0未删除，1已删除',
    default: () => "'0'",
  })
  isDeleted: number;
}
