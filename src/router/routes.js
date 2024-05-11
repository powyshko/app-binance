const routes = [
  {
    path: '/',
    redirect: '/settings'
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../pages/SettingsPage.vue')
  },
  {
    path: '/order-book',
    name: 'order-book',
    component: () => import('../pages/OrderBookPage.vue')
  }
]

export default routes;
