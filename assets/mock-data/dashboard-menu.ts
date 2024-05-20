interface DashboardMenu {
  title: string
  path: string
}

export const dashboardMenu: DashboardMenu[] = [
  {
    title: 'Account',
    path: '/user',
  },
  {
    title: 'Income',
    path: '/user/income',
  },
  {
    title: 'Expense',
    path: '/user/expense',
  },
  {
    title: 'Logout',
    path: '/logout',
  },
]
