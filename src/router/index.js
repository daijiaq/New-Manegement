import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../views/main.vue";
import Login from "../views/login/index.vue";
import Dashboard from "../views/timeManagement/timeManagement.vue";
import Admin from "../views/auth/admin/index.vue";
import Group from "../views/auth/group/index.vue";
import Staff from "../views/vppz/staff/index.vue";
import Order from "../views/vppz/order/index.vue";
import Notice from "../views/notice/index.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    name: "main",
    children: [
      {
        path: "dashboard",
        meta: { id: "1", name: "时间管理", icon: "Clock", path: "/dashboard" },
        component: Dashboard,
      },
      {
        path: "auth/group",
        meta: { id: "2", name: "人员管理", icon: "User", path: "/auth/group" },
        component: Group,
      },
      {
        path: "vppz/staff",
        meta: {
          id: "3",
          name: "进度管理",
          icon: "BellFilled",
          path: "/vppz/staff",
        },
        component: Staff,
      },
      {
        path: "notice",
        meta: {
          id: "4",
          name: "通知管理",
          icon: "ChatDotSquare",
          path: "/notice",
        },
        component: Notice,
      },
    ],
  },
];

// const routes = [
//   {
//     path: '/',
//     component: Layout,
//     name: 'main',
//     children: [
//       {
//         path: 'dashboard',
//         meta: { id: '1', name: '时间管理', icon: 'Clock', path: '/dashboard'},
//         component: Dashboard
//       },
//       {
//         path: 'auth',
//         meta: { id: '2' ,name: '人员管理', icon: 'User' },
//         children: [
//           {
//             path: '',
//             alias: ['admin'],
//             meta: { id: '1', name: '账号管理', icon: 'Avatar', path: '/auth/admin'},
//             component: Admin
//           },
//           {
//             path: 'group',
//             meta: { id: '2', name: '人员管理', icon: 'User', path: '/auth/group'},
//             component: Group
//           }
//         ]
//       },
//       {
//         path: 'vppz',
//         meta: { id: '3', name: '进度管理', icon: 'BellFilled' },
//         children: [
//           {
//             path: '',
//             alias: ['staff'],
//             meta: { id: '1', name: '进度管理', icon: 'Checked', path: '/vppz/staff'},
//             component: Staff
//           },
//           {
//             path: 'order',
//             meta: { id: '2', name: '订单管理', icon: 'List', path: '/vppz/order' },
//             component: Order
//           }
//         ]
//       },
//       {
//         path: 'notice',
//         meta: { id: '4', name: '通知管理', icon: 'ChatDotSquare', path: '/notice'},
//         component: Notice
//       }
//     ]
//   }

// ]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// 把这里注释了并且手动更改路径可以去页面
// router.beforeEach((to,from,next)=>{
//   const token=localStorage.getItem('token')
//   // 没有登录并且去的不是登录页面
//   if(!token&&to.path!=='/login'){
//     next({path:'/login'})
//   }
//   // 有登录并且准备去登录页
//   else if(token&&to.path==='/login'){
//     next({path:'/'})
//   }
//   else{
//     next()
//   }

// })

export default router;
