import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uk_perms", ["perms"], { unique: true })
@Index("idx_parent_id", ["parentId"], {})
@Index("idx_menu_type", ["menuType"], {})
@Entity("menus", { schema: "ai-doctor" })
export class Menus {
  @PrimaryGeneratedColumn({ type: "int", name: "menu_id", comment: "菜单id" })
  menuId: number;

  @Column("int", { name: "system_id", nullable: true, comment: "所属系统id" })
  systemId: number | null;

  @Column("int", { name: "parent_id", nullable: true, comment: "父级id" })
  parentId: number | null;

  @Column("varchar", {
    name: "menu_name",
    nullable: true,
    comment: "菜单/按钮名称",
    length: 255,
  })
  menuName: string | null;

  @Column("char", {
    name: "menu_type",
    nullable: true,
    comment: "菜单类型 M-目录 C-菜单 F-按钮",
    length: 1,
  })
  menuType: string | null;

  @Column("int", { name: "order_num", nullable: true, comment: "排序号" })
  orderNum: number | null;

  @Column("varchar", {
    name: "perms",
    nullable: true,
    unique: true,
    comment: "权限标识",
    length: 100,
  })
  perms: string | null;

  @Column("varchar", {
    name: "path",
    nullable: true,
    comment: "路由地址",
    length: 200,
  })
  path: string | null;

  @Column("varchar", {
    name: "component",
    nullable: true,
    comment: "组件路径",
    length: 255,
  })
  component: string | null;

  @Column("varchar", {
    name: "icon",
    nullable: true,
    comment: "菜单图标",
    length: 100,
  })
  icon: string | null;

  @Column("tinyint", {
    name: "is_frame",
    nullable: true,
    comment: "外链 0-是 1-否",
  })
  isFrame: number | null;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "状态 0-启用 1停用",
  })
  status: number | null;

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
    comment: "删除标记 0-未删除 1-已删除",
    default: () => "'0'",
  })
  isDeleted: number;
}
