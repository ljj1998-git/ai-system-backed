import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("systems", { schema: "ai-doctor" })
export class Systems {
  @PrimaryGeneratedColumn({ type: "int", name: "system_id", comment: "系统id" })
  systemId: number;

  @Column("varchar", {
    name: "system_name",
    nullable: true,
    comment: "系统名称",
    length: 50,
  })
  systemName: string | null;

  @Column("varchar", {
    name: "system_code",
    nullable: true,
    comment: "系统编码",
    length: 100,
  })
  systemCode: string | null;

  @Column("json", {
    name: "system_config",
    nullable: true,
    comment: "系统配置",
  })
  systemConfig: object | null;

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
