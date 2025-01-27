import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../components/menu/Login'
import History from '../components/menu/History'
import Pelanggan from '../components/menu/pengguna/Pelanggan'
import Karyawan from '../components/menu/pengguna/Karyawan'
import Rooms from '../components/menu/room/Rooms'
import Room from '../components/menu/room/Room'
import Foods from '../components/menu/food/Foods'
import Food from '../components/menu/food/Food'
import Reservasi from '../components/menu/res/Reservasi'
import Konfirmasi from '../components/menu/res/Konfirmasi'
import KonfirmasiPelanggan from '../components/menu/res/KonfirmasiPelanggan'
import ListRes from '../components/menu/res/HistoryReservasi'
import ListProRes from '../components/menu/res/ListReservasi'
import FoodExplore from '../components/menu/Explore'
import Tutorial from '../components/menu/tutorial/Tutorial'
import Bank from '../components/menu/bank/Banks'
import Category from '../components/menu/kategori/Categorys'
import CheckIn from '../components/menu/check/CheckIn'
import CheckOut from '../components/menu/check/CheckOut'
import Profile from '../components/user/Profile'
import Pendapatan from '../components/menu/invoice/Pendapatan'
import AuthGuard from './auth-guard'
import Secret from '../components/menu/Secret'



Vue.use(VueRouter)

const routes = [
  {
    path: '/secret',
    name: 'Secret',
    component: Secret
  },{
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/history',
    name: 'History',
    component: History
  },{
    path: '/pelanggan',
    name: 'Pelanggan',
    component: Pelanggan,
  },{
    path: '/karyawan',
    name: 'Karyawan',
    component: Karyawan,
  },{
    path: '/checkin',
    name: 'CheckIn',
    component: CheckIn,
  },{
    path: '/checkout',
    name: 'CheckOut',
    component: CheckOut,
  },{
    path: '/konfirmasi',
    name: 'Konfirmasi',
    component: Konfirmasi,
    beforeEnter: AuthGuard
  },{
    path: '/konfirmasipelanggan',
    name: 'KonfirmasiPelanggan',
    component: KonfirmasiPelanggan,
  },{
    path: '/listreservasi',
    name: 'List',
    component: ListRes,
    beforeEnter: AuthGuard
  },{
    path: '/listprosesreservasi',
    name: 'Proses',
    component: ListProRes,
    beforeEnter: AuthGuard
  },{
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
    beforeEnter: AuthGuard
  },{
    path: '/rooms/:id',
    name: 'Room',
    props: true,
    component: Room
  },{
    path: '/rooms/:id/reservasi',
    name: 'Reservasi',
    props: true,
    component: Reservasi,
    beforeEnter: AuthGuard
  },{
    path: '/foods',
    name: 'Foods',
    component: Foods,
    beforeEnter: AuthGuard
  },{
    path: '/foods/:id',
    name: 'Food',
    props: true,
    component: Food
  },{
    path: '/foodnbeverages',
    name: 'FoodExplore',
    component: FoodExplore
  },{
    path: '/bank',
    name: 'Bank',
    component: Bank,
    beforeEnter: AuthGuard
  },{
    path: '/category',
    name: 'Category',
    component: Category,
    beforeEnter: AuthGuard
  },{
    path: '/user/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },{
    path: '/pendapatan',
    name: 'Pendapatan',
    component: Pendapatan,
    beforeEnter: AuthGuard
  },{
    path: '/tutorial',
    name: 'Tutorial',
    component: Tutorial,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
