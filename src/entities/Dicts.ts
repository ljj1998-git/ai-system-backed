import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("dicts", { schema: "ai-doctor" })
export class Dicts {
  @PrimaryGeneratedColumn({ type: "int", name: "dict_id", comment: "字典id" })
  dictId: number;

  @Column("int", { name: "system_id", nullable: true, comment: "所属系统Id" })
  systemId: number | null;

  @Column("int", { name: "parent_id", nullable: true, comment: "字典父级id" })
  parentId: number | null;

  @Column("varchar", {
    name: "label",
    nullable: true,
    comment: "字典名",
    length: 50,
  })
  label: string | null;

  @Column("varchar", {
    name: "value",
    nullable: true,
    comment: "字典值",
    length: 255,
  })
  value: string | null;

  @Column("int", {
    name: "dict_type",
    nullable: true,
    comment: "字典值类型 0字符串 1数字",
  })
  dictType: number | null;

  @Column("varchar", {
    name: "dict_code",
    nullable: true,
    comment: "字典编码",
    length: 100,
  })
  dictCode: string | null;

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
