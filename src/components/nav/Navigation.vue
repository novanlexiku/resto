<template>
    <nav>
        <!-- Navbar komponen -->
        <v-app-bar flat app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="text-uppercase caption">
           <router-link to="/" style="cursor: pointer"><span>GILI SEAFOOD & GRILL</span></router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

       
        <v-btn v-if="loggedIn" @click="signOut" text small>
            <span>Sign Out</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
        <v-btn v-else text small router to="/login">
            <span>Sign In</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
        </v-app-bar>
 
<!-- Navigasi dengan route masing-masing item -->
        <v-navigation-drawer v-model="drawer" app>
            <!-- avatar -->
            <v-row dense>
                <v-col v-if="loggedIn" class="mt-5 text-center">
                    <v-avatar size="100">
                    <img :src="user.image">
                    </v-avatar>
                    <p class="subtitle-1 mt-1">{{user.nama}}</p>
                </v-col>
                <v-col v-else class="mt-5 text-center">
                    <v-avatar size="100">
                    </v-avatar>
                    <p  class="subtitle-1 mt-1">Logged Out</p>
                </v-col>
            </v-row>
      <!-- List Menu -->
           <v-list  v-if="userIsKaryawan || userIsAdmin" dense>
            <v-list-item-group color="primary" class="mt-2">
                <v-list-item
                v-for="item in items"
                :key="item.text"
                router :to="item.route"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <v-list-group
                    prepend-icon="mdi-account-box"
                >
                    <template v-slot:activator>
                    <v-list-item-title>Pengguna</v-list-item-title>
                    </template>
                    <v-list-item-group sub-group color="primary" class="mt-2">
                        <v-list-item
                        v-for="item in admins"
                        :key="item.text"
                        router :to="item.route"
                        >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
                <v-list-group 
                    prepend-icon="mdi-clover"
                >
                    <template v-slot:activator>
                    <v-list-item-title>Reservasi</v-list-item-title>
                    </template>
                    <v-list-item-group sub-group color="primary" class="mt-2">
                        <v-list-item
                        v-for="item in reservasi"
                        :key="item.text"
                        router :to="item.route"
                        >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
                <v-list-group 
                    prepend-icon="mdi-door-open"
                >
                    <template v-slot:activator>
                    <v-list-item-title>Check</v-list-item-title>
                    </template>
                    <v-list-item-group sub-group color="primary" class="mt-2">
                        <v-list-item
                        v-for="item in check"
                        :key="item.text"
                        router :to="item.route"
                        >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
            </v-list>
            <!-- List Menu -->
           <v-list  v-else dense>
            <v-list-item-group color="primary" class="mt-2">
                <v-list-item
                v-for="item in items"
                :key="item.text"
                router :to="item.route"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            </v-list>
            
        </v-navigation-drawer>

    </nav>
</template>

<script>
import firebase from 'firebase/app'
export default {
    data: () => ({
                loggedIn: false,
            drawer: false,
             
    }),
    computed: {
        user(){
            return this.$store.getters.loadedUser
        },
        
        items () {
            let items = [
                { text: 'Home', icon: 'mdi-home', route: '/' },
                { text: 'Foods', icon: 'mdi-food-fork-drink', route: '/foodnbeverages' },
                { text: 'Login', icon: 'mdi-map-marker', route: '/login' },
                // { text: 'Tutorial', icon: 'mdi-timeline-help-outline', route: '/tutorial' },
            ]
            if (this.userIsAuthenticated && this.loggedIn) {
                items = [
                { text: 'Home', icon: 'mdi-home', route: '/' },
                { text: 'Foods', icon: 'mdi-food-fork-drink', route: '/foodnbeverages' },
                { text: 'History', icon: 'mdi-history', route: '/history' },
                { text: 'Konfirmasi', icon: 'mdi-marker-check', route: '/konfirmasipelanggan' },
                { text: 'Profile', icon: 'mdi-face-profile', route: '/user/profile' },
                // { text: 'Tutorial', icon: 'mdi-timeline-help-outline', route: '/tutorial' },
                ]
            }
            if (this.userIsAdmin && this.loggedIn){
                items = [
                { text: 'Home', icon: 'mdi-home', route: '/' },
                { text: 'Foods', icon: 'mdi-food-fork-drink', route: '/foodnbeverages' },
                { text: '+ Ruangan', icon: 'mdi-room-service', route: '/rooms' },
                { text: '+ Makanan', icon: 'mdi-food-fork-drink', route: '/foods' },
                { text: 'Profile', icon: 'mdi-face-profile', route: '/user/profile' },
                { text: 'Bank', icon: 'mdi-bank', route: '/bank' },
                { text: 'Kategori', icon: 'mdi-view-grid-plus-outline', route: '/category' },
                { text: 'Pendapatan', icon: 'mdi-square-inc-cash', route: '/pendapatan' },
                // { text: 'Tutorial', icon: 'mdi-timeline-help-outline', route: '/tutorial' },
                ]
            }
            if (this.userIsKaryawan && this.loggedIn){
                items = [
                { text: 'Home', icon: 'mdi-home', route: '/' },
                { text: 'Foods', icon: 'mdi-food-fork-drink', route: '/foodnbeverages' },
                { text: 'Konfirmasi', icon: 'mdi-marker-check', route: '/konfirmasipelanggan' },
                { text: 'Profile', icon: 'mdi-face-profile', route: '/user/profile' },
                ]
            }
            return items
        },
        admins(){
            let admins = []
            if(this.userIsAdmin && this.loggedIn){
            admins = [
            { text: 'Pelanggan', icon: 'mdi-account-circle-outline', route: '/pelanggan' },
            { text: 'Karyawan', icon: 'mdi-account-group-outline', route: '/karyawan' },
            ]
            }
            if(this.userIsKaryawan && this.loggedIn){
            admins = [
            { text: 'Pelanggan', icon: 'mdi-account-circle-outline', route: '/pelanggan' },
            ]
            }
            return admins
        },
        check(){
            let check = []
            if(this.userIsAdmin && this.loggedIn || this.userIsKaryawan && this.loggedIn){
            check = [
            { text: 'Check-In', icon: 'mdi-chevron-right-box-outline', route: '/checkin' },
            { text: 'Check-Out', icon: 'mdi-chevron-left-box-outline', route: '/checkout' },
            ]
            }
            return check
        },
        reservasi(){
            let reservasi = []
            if(this.userIsAdmin && this.loggedIn || this.userIsKaryawan && this.loggedIn){
            reservasi = [
            { text: 'Konfirmasi', icon: 'mdi-marker-check', route: '/konfirmasi' },
            { text: 'List Reservasi', icon: 'mdi-history', route: '/listprosesreservasi' },
            { text: 'History Reservasi', icon: 'mdi-history', route: '/listreservasi' },
            ]
            }
            return reservasi
        },
        userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsAdmin () {
            if (!this.userIsAuthenticated) {
            return false
            }
            return this.$store.getters.user.role === 'admin'
        },
        userIsKaryawan () {
            if (!this.userIsAuthenticated) {
            return false
            }
            return this.$store.getters.user.role === 'karyawan'
        },
    },
    methods:{
        //method logout
    async signOut(){
        try {
        const data = await  firebase.auth().signOut()
        console.log(data)
        this.$router.push('/login')
        } catch (err) {
            console.log(err)
        }


        }
    },
    //membuat atau mengubah session user
    created(){
        firebase.auth().onAuthStateChanged(user => {
            this.loggedIn = !!user
            if (user) {
                this.loggedIn = true
            } else {
                this.loggedIn = false
            }
        })
    }
}
</script>

<style>

</style>