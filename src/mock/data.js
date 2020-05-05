import Mock from 'mockjs'
const Random = Mock.Random

export const getTableData = req => {
  return Mock.mock({
    message: "success",
    status: 1,
    data: [
      {
        pId: 1, // 父级节点id
        title: "firt",
        expand: true,
        level: 1,  // 层级
        id: 10,
        children: [
          {
            title: "11.html",
            expand: true,
            isLast: true,
            level: 2,
            url: '11.html',
            id: 101,
            pId: 10
          },
          {
            title: "12.html",
            expand: true,
            isLast: true,
            level: 2,
            url: '12.html',
            id: 102,
            pId: 10
          }
        ]
      },
      {
        title: "second",
        expand: true,
        level: 1,
        id: 20,
        pId: 1,
        children: [
          {
            title: "2.html",
            expand: true,
            isLast: true,
            level: 2,
            url: '1.html',
            id: 201,
            pId: 20
          },
          {
            title: "3.html",
            expand: true,
            isLast: true,
            level: 2,
            pId: 20,
            url: '1.html',
            id: 202

          }
        ]
      }
    ]
  })
}




