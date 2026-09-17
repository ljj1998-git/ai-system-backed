import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("files", { schema: "ai-doctor" })
export class Files {
  @PrimaryGeneratedColumn({ type: "int", name: "file_id", comment: "文件id" })
  fileId: number;

  @Column("int", { name: "system_id", nullable: true, comment: "所属系统id" })
  systemId: number | null;

  @Column("varchar", {
    name: "file_name",
    nullable: true,
    comment: "文件名称",
    length: 50,
  })
  fileName: string | null;

  @Column("varchar", {
    name: "file_src",
    nullable: true,
    comment: "文件地址",
    length: 255,
  })
  fileSrc: string | null;

  @Column("tinyint", {
    name: "file_type",
    nullable: true,
    comment: "文件类型 0doc 1docx ",
  })
  fileType: number | null;

  @Column("longtext", {
    name: "file_desc",
    nullable: true,
    comment: "文件描述",
  })
  fileDesc: string | null;

  @Column("tinyint", {
    name: "upload_base",
    nullable: true,
    comment: "是否上传到知识库 0已上传 1未上传",
  })
  uploadBase: number | null;

  @Column("int", { name: "create_by", nullable: true, comment: "创建人" })
  createBy: number | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date | null;
}
