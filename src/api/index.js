// 当前这个模块：API进行统一管理
import requests from "./request"
import mockRequests from './mockAjax'
/* 
    首页三级分类
    请求地址：/api/product/getBaseCategoryList
    请求方式：GET
*/
// 暴露三级联动接口
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'})
// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')
// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据 地址：/api/list 请求方式post 参数：需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
export const reqGetSearchInfo = (params) => requests({url:"/list", method:"post", data:params})

// 获取商品详情 请求地址:/api/item/{ skuId } 请求方式:GET 
/**
 * @description 参数名称	类型	是否必选	描述 skuId	string	Y	商品ID
 * @param {Int} skuId 
 * @returns 
 */
export const reqGetGoodDetail = (skuId) => requests({url:`/item/${skuId}`, method:"get"})

// 添加到购物车(对已有物品进行数量改动)
// /api/cart/addToCart/ { skuId }/{ skuNum } POST 
// skuID string 商品ID
// skuNum string 商品数量 正数代表增加 负数代表减少
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'post'})

// 获取购物车列表 /api/cart/cartList GET
export const reqCartList = () => requests({url:'/cart/cartList', method:'get'})

// 删除购物车商品 /api/cart/deleteCart/{skuId} DELETE 参数 skuId（string）商品id

export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`, method:'delete'})


// 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked} GET
// skuID(string)  商品ID  isChecked(string) 商品选中状态 0代表取消选中 1代表选中
export const reqUpdateCheckCartById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'})

// 获取验证码 /api/user/passport/sendCode/{phone} GET
export const reqSendCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册用户 /api/user/passport/register POST
/* phone	string	Y	注册手机号
  password	string	Y	密码
  code	string	Y	验证码
 */
export const reqRegister = (params) => requests({url:'/user/passport/register',method:'post',data:params})

// 登录 /api/user/passport/login POST
/* phone	string	Y	用户名
password	string	Y	密码 */
export const reqLogin = (params) => requests({url:'/user/passport/login',method:'post',data:params})

// 通过token获取用户信息 /api/user/passport/auth/getUserInfo get
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登陆 /api/user/passport/logout GET
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqUserAddress = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页信息 /api/order/auth/trade GET
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} POST
export const reqSubmitOrder = (tradeNo,param) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data:param})

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} GET
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单列表 /api/order/auth/{page}/{limit} GET
export const reqMyOrder = (page, limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})