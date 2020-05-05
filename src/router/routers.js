import Layout from '../views/Layout';
export default [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        children: [
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(`@/views/login/Login`),
    }

]