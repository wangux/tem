export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

// 用户登录数据模型
export interface DWLoginData {
  loginName: string // 登录名
  password: string // 密码
  pwkey: string | number // 后台返的密钥
  imageCode: string | number, // 图片验证码
  imageKey: string // 后台返的图片验证码密钥
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}

export interface MenuData {
  url: string
  title: string
  icon: string
  [propname:string]: any
}