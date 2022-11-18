import {v4 as uuidv4} from 'uuid'
export const getUUID = ()=>{
    // 通过本地存储获取uuid
    let uuid_token = localStorage.getItem("UUIDTOKEN")
    // 当不存在时
    if(!uuid_token){
        // 生成uuid
        uuid_token = uuidv4()
        // 并将uuid存储在本地
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    // 最后返回uuid
    return uuid_token
}