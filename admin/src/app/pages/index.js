import React, { lazy } from 'react';

const Login = lazy(() => import('./Login'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const Home = lazy(() => import('./Home'));
const Permission = lazy(() => import('./Permission'));
const Provider = lazy(() => import('./Provider'));
const Customer = lazy(() => import('./Customer'));
const Withdraw = lazy(() => import('./Withdraw'));
const Service = lazy(() => import('./Service'));
const Payment = lazy(() => import('./Payment'));
const Sales = lazy(() => import('./Sales'));
const Board = lazy(() => import('./Board'));
const Staff = lazy(() => import('./Staff'));
const Me = lazy(() => import('./Me'));

export const pages = [
  {
    authorized: false,
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    authorized: false,
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
  },
  {
    authorized: true,
    path: '/home',
    component: Home,
    label: '홈',
    role: [],
  },
  {
    label: '사용자관리',
    // icon: <i className="fa fa-fw fa-home"></i>,
    rows: [
      {
        authorized: true,
        path: '/permission',
        component: Permission,
        label: '승인요청 관리',
        role: [],
      },
      {
        authorized: true,
        path: '/provider',
        component: Provider,
        label: '서비스 제공자 관리',
        role: [],
      },
      {
        authorized: true,
        path: '/customer',
        component: Customer,
        label: '일반회원 관리',
        role: [],
      },
      {
        authorized: true,
        path: '/withdraw',
        component: Withdraw,
        label: '탈퇴회원 관리',
        role: [],
      },
    ],
  },
  {
    authorized: true,
    path: '/service',
    component: Service,
    label: '서비스 관리',
    role: [],
  },
  {
    label: '금액관리',
    // icon: <i className="fa fa-fw fa-home"></i>,
    rows: [
      {
        authorized: true,
        path: '/payment',
        component: Payment,
        label: '결제 관리',
        role: [],
      },
      {
        authorized: true,
        path: '/sales',
        component: Sales,
        label: '매출 관리',
        role: [],
      },
    ],
  },
  {
    authorized: true,
    path: '/board',
    component: Board,
    label: '공지사항 관리',
    role: [],
  },
  {
    label: '계정관리',
    // icon: <i className="fa fa-fw fa-home"></i>,
    rows: [
      {
        authorized: true,
        path: '/staff',
        component: Staff,
        label: '관리자 계정 관리',
        role: [],
      },
      {
        authorized: true,
        path: '/me',
        component: Me,
        label: '내 계정 관리',
        role: [],
      },
    ],
  },
];
