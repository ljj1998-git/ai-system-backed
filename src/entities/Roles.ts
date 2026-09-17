import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles", { schema: "ai-doctor" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "role_id", comment: "角色id" })
  roleId: number;

  @Column("int", { name: "system_id", nullable: true, comment: "所属系统id" })
  systemId: number | null;

  @Column("varchar", { name: "role_name", comment: "角色名称", length: 255 })
  roleName: string;

  @Column("varchar", { name: "role_code", comment: "角色编码", length: 255 })
  roleCode: string;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 100,
  })
  remark: string | null;

  @Column("int", { name: "create_by", nullable: true, comment: "创建人" })
  createBy: number | null;

  @Column("int", { name: "update_by", nullable: true, comment: "修改人" })
  updateBy: number | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    comment: "修改时间",
  })
  updateTime: Date | null;

  @Column("tinyint", {
    name: "is_deleted",
    comment: "删除标记，0未删除，1已删除",
    default: () => "'0'",
  })
  isDeleted: number;
}
