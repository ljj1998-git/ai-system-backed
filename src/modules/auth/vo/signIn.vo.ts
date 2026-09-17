import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Users } from '@/entities/Users.js';
// import { DictTreeVo } from "../../dict/vo/dict-tree.vo";
// import { MenuTreeVo } from "../../menu/vo/menu-tree.vo";

export class SignInVo extends Users {
  // @ApiPropertyOptional({ description: '角色名称' })
  // @Expose()
  // roleName?: string;

  // @ApiProperty({ description: '访问令牌' })
  // @Expose()
  // accessToken: string;

  // @ApiProperty({ description: '刷新令牌' })
  // @Expose()
  // refreshToken: string;

  // @ApiPropertyOptional({ description: "字典树", type: [DictTreeVo] })
  // @Type(() => DictTreeVo)
  // @Expose()
  // dictTree?: DictTreeVo[];

  // @ApiPropertyOptional({ description: "菜单树", type: [MenuTreeVo] })
  // @Type(() => MenuTreeVo)
  // @Expose()
  // menuTree?: MenuTreeVo[];

  // @ApiPropertyOptional({ description: "按钮权限标识", type: [String] })
  // @Expose()
  // perms?: string[];
}
