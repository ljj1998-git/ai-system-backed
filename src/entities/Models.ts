import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("models", { schema: "ai-doctor" })
export class Models {
  @PrimaryGeneratedColumn({ type: "int", name: "model_id", comment: "模型id" })
  modelId: number;

  @Column("tinyint", {
    name: "is_default",
    nullable: true,
    comment: "通用模型 0是 1否（如果是0是公用的，1是独立的）",
  })
  isDefault: number | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "自定义模型名称",
    length: 255,
  })
  name: string | null;

  @Column("tinyint", {
    name: "model_provider",
    nullable: true,
    comment: "预设供应商 0自定义 1 Deepseek",
  })
  modelProvider: number | null;

  @Column("varchar", {
    name: "model_key",
    nullable: true,
    comment: "模型key",
    length: 255,
  })
  modelKey: string | null;

  @Column("varchar", {
    name: "model_path",
    nullable: true,
    comment: "模型api请求地址",
    length: 255,
  })
  modelPath: string | null;

  @Column("varchar", {
    name: "model_name",
    nullable: true,
    comment: "模型名称",
    length: 255,
  })
  modelName: string | null;

  @Column("tinyint", {
    name: "model_type",
    comment: "api格式 0 openai格式 1 anthropic格式",
  })
  modelType: number;

  @Column("longtext", {
    name: "model_effort",
    nullable: true,
    comment: "模型思考强度 openai() ",
  })
  modelEffort: string | null;

  @Column("longtext", {
    name: "system_prompt",
    nullable: true,
    comment: "模型定义文字",
  })
  systemPrompt: string | null;

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
