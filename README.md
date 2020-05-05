# vue-iview 后台管理框架

## Project setup
.
- ├─ package-lock.json
- ├─ package.json
- ├── public
- │   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── api                  -- api接口配置
│   │   ├── templete.js
│   │   └── user.js
│   ├── assets
│   │   ├── imgs
│   │   │   ├── loginleft.png
│   │   │   ├── logo_close.png
│   │   │   └── logo_open.png
│   │   └── styles
│   │       ├── main.scss     -- 公共样式
│   │       └── theme.less    -- 框架主题样式
│   ├── components
│   │   └── HelloWorld.vue
│   ├── libs
│   │   ├── api.request.js
│   │   └── axios.js         --axios封装
│   ├── main.js
│   ├── mock                 -- mock数据
│   │   ├── data.js
│   │   ├── index.js
│   │   └── user.js
│   ├── router
│   │   ├── index.js        -- 路由配置
│   │   └── routers.js      -- 路由权限控制
│   ├── store
│   │   └── index.js
│   └── views
│       ├── Layout.vue
│       └── login
│           └── Login.vue
└── vue.config.js         -- webpack相关配置
└── .env.dev              -- 开发环境配置
└── .env.prod             -- 生产环境配置




