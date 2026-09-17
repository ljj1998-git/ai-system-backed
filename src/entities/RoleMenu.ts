import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_role_id", ["roleId"], {})
@Index("idx_menu_id", ["menuId"], {})
@Entity("role_menu", { schema: "ai-doctor" })
export class RoleMenu {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "role_id", nullable: true })
  roleId: number | null;

  @Column("int", { name: "menu_id", nullable: true })
  menuId: number | null;
}
