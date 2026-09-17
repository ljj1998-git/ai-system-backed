import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("chat_historys", { schema: "ai-doctor" })
export class ChatHistorys {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "message_id",
    comment: "对话消息id",
  })
  messageId: number;

  @Column("int", { name: "chat_id", nullable: true, comment: "所属对话窗口id" })
  chatId: number | null;

  @Column("tinyint", {
    name: "type",
    nullable: true,
    comment: "对话消息类型 0用户 1AI ",
  })
  type: number | null;

  @Column("longtext", { name: "content", nullable: true, comment: "内容" })
  content: string | null;

  @Column("longtext", {
    name: "think_content",
    nullable: true,
    comment: "思考内容",
  })
  thinkContent: string | null;

  @Column("longtext", {
    name: "source_content",
    nullable: true,
    comment: "数据来源",
  })
  sourceContent: string | null;

  @Column("int", { name: "order", nullable: true, comment: "对话顺序" })
  order: number | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date | null;
}
