import Mock from 'mockjs'
import { getTableData} from './data'

Mock.setup({
  timeout: 1000
})

// 获取资料树结构
Mock.mock(/\/mock\/getCatelogList/, getTableData)

export default Mock
