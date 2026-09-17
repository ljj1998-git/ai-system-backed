import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  SetMetadata,
  Type,
} from '@nestjs/common';
import { DECORATOR_MESSAGE_KEY } from '@/constants/decorator-key.constant.js';
import {
  ApiExtraModels,
  ApiProperty,
  ApiResponse,
  getSchemaPath,
  SchemaObject,
} from '@nestjs/swagger';

type TModel = Type<any> | Type<any>[];

interface IApiResultParams {
  /** 返回信息 */
  message?: string;
  /** 返回体数据类型 */
  type?: TModel | TModel[];
  /** 是否有分页 */
  isPage?: boolean;
}

class ResponseVo<T> {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '消息', example: '操作成功' })
  message: string;

  @ApiProperty({ description: '数据', required: false })
  data?: T;
}

class PageVo<T> {
  @ApiProperty({ description: '当前页码' })
  page: number;

  @ApiProperty({ description: '每页条数' })
  pageSize: number;

  @ApiProperty({ description: '总条数' })
  total: number;

  @ApiProperty({ description: '数据列表' })
  list: T[];
}

export function ApiResult(params: IApiResultParams) {
  const { message, type, isPage } = params;
  const dataProp = processingType(type, isPage);

  // 收集所有需要注册的模型
  const extraModels: any = [ResponseVo];
  if (isPage) {
    extraModels.push(PageVo);
  }
  if (type) {
    if (Array.isArray(type)) {
      extraModels.push(type[0]);
    } else {
      extraModels.push(type);
    }
  }

  // applyDecorators 将多个功能装饰器合并为一个统一装饰器，简化控制器代码
  return applyDecorators(
    // 设置返回体message,注意要放在 applyDecorators 中否则不生效
    SetMetadata(DECORATOR_MESSAGE_KEY, message),
    // 设置 HTTP 状态码为 200
    HttpCode(HttpStatus.OK),
    // 显式告诉 Swagger：请将这些模型（类）注册到 Swagger 的 Schema 系统中，否则 Swagger 无法正确显示这些模型的属性。
    ApiExtraModels(...extraModels),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseVo) },
          // 设置data的类型
          {
            properties: {
              data: dataProp,
            },
          },
        ],
      },
    }),
  );
}

function processingType(
  type: TModel | TModel[] | undefined,
  isPage: boolean = false,
) {
  let prop: SchemaObject = { type: 'null', default: null };
  if (type) {
    if (Array.isArray(type)) {
      // 分页情况
      if (isPage) {
        prop = {
          type: 'object',
          allOf: [
            { $ref: getSchemaPath(PageVo) },
            {
              properties: {
                list: {
                  type: 'array',
                  items: { $ref: getSchemaPath(type[0] as Type<any>) },
                },
              },
            },
          ],
        };
      }
      // 普通数组
      else {
        prop = {
          type: 'array',
          items: genBaseProp(type[0] as Type<any>),
        };
      }
    } else {
      prop = genBaseProp(type);
    }
  }

  return prop;
}

const baseTypeNames = ['String', 'Number', 'Boolean'];
function genBaseProp(type: Type<any>) {
  if (baseTypeNames.includes(type.name))
    return { type: type.name.toLocaleLowerCase() };
  else return { $ref: getSchemaPath(type) };
}
