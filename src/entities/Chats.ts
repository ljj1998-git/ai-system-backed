import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("chats", { schema: "ai-doctor" })
export class Chats {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "chat_id",
    comment: "对话窗口id",
  })
  chatId: number;

  @Column("int", { name: "model_id", nullable: true, comment: "所选模型id" })
  modelId: number | null;

  @Column("varchar", {
    name: "chat_name",
    nullable: true,
    comment: "对话窗口名称",
    length: 255,
  })
  chatName: string | null;

  @Column("tinyint", {
    name: "think",
    nullable: true,
    comment: "深度思考 0开启 1关闭",
  })
  think: number | null;

  @Column("varchar", {
    name: "effort",
    nullable: true,
    comment: "模型思考强度",
    length: 50,
  })
  effort: string | null;

  @Column("tinyint", {
    name: "online",
    nullable: true,
    comment: "联网搜索 0开启 1关闭",
  })
  online: number | null;

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
