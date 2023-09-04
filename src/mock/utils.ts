import {MockResParams} from './typing'
//用于解析出请求的参数
export default function parsePars (res:MockResParams){
   return JSON.parse(res.body)
}
