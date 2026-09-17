/** 未使用 ResSuccessMessage 装饰器且返回值非 string 时的默认成功文案 */
export const DEFAULT_SUCCESS_MESSAGE = '操作成功';

export enum ResponseMessage {
  error = '系统内部错误，请联系管理员',

  signInSuccess = '登录成功',
  signOutSuccess = '退出登录成功',
  refreshTokenInvalid = '刷新令牌已失效',
  refreshTokenSuccess = '刷新令牌成功',

  createUserSuccess = '用户新增成功',
  usernameExists = '所选系统下用户名已存在',
  userNotFound = '用户不存在',
  deleteUserSuccess = '删除用户成功',

  createRoleSuccess = '角色新增成功',
  roleNameExists = '所选系统下角色名称已存在',
  roleNotFound = '角色不存在',
  deleteRoleSuccess = '删除角色成功',

  createMenuSuccess = '菜单新增成功',
  menuNotFound = '菜单不存在',
  deleteMenuSuccess = '删除菜单成功',

  createDictSuccess = '字典新增成功',
  dictNotFound = '字典不存在',
  deleteDictSuccess = '删除字典成功',

  createSystemSuccess = '系统新增成功',
  systemNotFound = '系统不存在',
  deleteSystemSuccess = '删除系统成功',
  systemNotMatchUser = '用户不属于当前系统',

  createModelSuccess = '模型新增成功',
  modelNotFound = '模型不存在',
  deleteModelSuccess = '删除模型成功',
  fetchModelListFailed = '获取模型列表失败',
  invalidModelEffort = '思考强度参数格式错误',

  createChatSuccess = '对话创建成功',
  chatNotFound = '对话不存在',
  deleteChatSuccess = '删除对话成功',

  createFileSuccess = '文件新增成功',
  deleteFileSuccess = '删除文件成功',
  uploadFileSuccess = '文件上传成功',
  fileSame = '文件已存在',
  fileNotExist = '文件不存在',
}
