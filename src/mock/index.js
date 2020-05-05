import Mock from 'mockjs'
import { getTableData} from './data'
import {  login} from "./user";
Mock.setup({
  timeout: 1000
})

// 获取资料树结构
Mock.mock(/\/mock\/getCatelogList/, getTableData)
Mock.mock(/\/mock\/login/, login)


export default Mock
