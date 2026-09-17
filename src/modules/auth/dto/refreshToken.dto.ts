import z from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const RefreshTokenDto = z.object({
  refreshToken: z.string(),
});

// export class RefreshTokenDto {
//   @ApiProperty({ description: '刷新令牌' })
//   @IsString()
//   @IsNotEmpty()
//   refreshToken: string;
// }
