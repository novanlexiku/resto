<template>
  <div class="reservasi">
    <template grid-list-sm>
      <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="success">
          <span>Reservasi berhasil ditambahkan</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <!-- Stepper -->
      <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Mengisi Form</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Pre Order Makanan</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Reservasi</v-stepper-step>
      </v-stepper-header>

    <v-stepper-items>
        <!-- Stepper 1 -->
      <v-stepper-content step="1">
                              <v-row>
                              <!-- Deskripsi Reservasi -->
                                <v-col cols="12" sm="12">
                                    <v-card>
                                        <v-list-item>
                                        <v-list-item-content>
                                          <v-dialog
                                                    v-model="dialog"
                                                    width="700"
                                                    >
                                                    <template v-slot:activator="{ on }">
                                                    <v-img
                                                    :src="room.image"
                                                    height="194"
                                                    max-width="300"
                                                    class="mx-1"
                                                    v-on="on"
                                                    ></v-img>
                                                    </template>
                                                            <v-img
                                                            :src="room.image"
                                                            >
                                                            <v-btn
                                                                dark
                                                                icon
                                                                @click="dialog = false"
                                                            >
                                                            <v-icon>mdi-close</v-icon>
                                                            </v-btn>
                                                            </v-img>
                                                    </v-dialog>
                                            <v-list-item-title class="headline">{{room.title}}</v-list-item-title>
                                            <v-list-item-subtitle>Harga : {{room.harga|toCurrency}} / Jam</v-list-item-subtitle>
                                        </v-list-item-content>
                                        </v-list-item>
                                                <div class="d-flex flex-no-wrap justify-space-between" >
                                                <v-card-text max-width="300">
                                                    <!-- form Checkin -->
                                                <v-form ref="form">
                                                  <v-col cols="12" sm="6"> 
                                                    <v-text-field label="Nama" v-model="nama" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                                                  </v-col>
                                                  <v-col cols="12" sm="6"> 
                                                    <v-text-field label="No Ktp" v-model="no_ktp" prepend-icon="mdi-information" :rules="inputRules"></v-text-field>
                                                  </v-col>
                                                  <v-col cols="12" sm="6"> 
                                                    <v-text-field label="Telp" v-model="telp" prepend-icon="mdi-cellphone" :rules="inputRules"></v-text-field>
                                                  </v-col>
                                                  <v-col cols="12" sm="6"> 
                                                    <v-menu ref="menu" :close-on-content-click="false" :return-value.sync="tanggal"
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        >
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                            :rules="dateRules" :value="formattedDate"
                                                            label="Tanggal Check-in"
                                                            prepend-icon="mdi-calendar-account"
                                                            readonly
                                                            clearable
                                                            v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="tanggal" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="$refs.menu.save(tanggal)">OK</v-btn>
                                                        </v-date-picker>
                                                        </v-menu>
                                                  </v-col>
                                                  <v-col cols="12" sm="6">
                                                      <v-menu
                                                        ref="menu2"
                                                        v-model="menu2"
                                                        :close-on-content-click="false"
                                                        :nudge-right="40"
                                                        :return-value.sync="time"
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        min-width="290px"
                                                      >
                                                        <template v-slot:activator="{ on }">
                                                          <v-text-field
                                                            v-model="time"
                                                            label="Waktu Check-in"
                                                            prepend-icon="mdi-clock-fast"
                                                            readonly
                                                            v-on="on"
                                                          ></v-text-field>
                                                        </template>
                                                        <v-time-picker
                                                          v-if="menu2"
                                                          v-model="time"
                                                          full-width
                                                          format="24hr"
                                                        >
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="$refs.menu2.save(time)">OK</v-btn>
                                                        </v-time-picker>
                                                      </v-menu>
                                                    </v-col>
                                                  <v-col cols="12" sm="6"> 
                                                    <v-text-field label="Lama Sewa" v-model="sewa" suffix="Jam" prepend-icon="mdi-arrow-right-bold-box-outline"></v-text-field>
                                                  </v-col>
                                                  <!-- <v-col cols="12" sm="6"> 
                                                  <v-select 
                                                          :items="banks"
                                                          v-model="bank"
                                                          label="Jenis Pembayaran"
                                                          item-text="title"
                                                          item-value="rekening"
                                                          prepend-icon="mdi-bank"
                                                          bottom
                                                          autocomplete
                                                          ></v-select>
                                                  </v-col> -->
                                                  <v-col cols="12" sm="6">
                                                        <v-text-field v-model="total"  prefix="IDR " prepend-icon="mdi-currency-usd" readonly></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6">
                                                        <v-text-field v-model="checkin" prepend-icon="mdi-calendar-clock" label="Tanggal dan Waktu Check-In" readonly></v-text-field>
                                                        </v-col>
                                                    </v-form>
                                                    <v-btn
                                                      color="primary"
                                                      class="ma-3"
                                                      @click="e1 = 2"
                                                    >
                                                      Selanjutnya
                                                    </v-btn>
                                                    <v-btn text class="ma-3" router to="/">Batal</v-btn> 
                                                </v-card-text>
                                                </div>
                                    </v-card>
                                </v-col>
                              </v-row>
                            
      </v-stepper-content>
        <!-- Stepper 2 -->
      <v-stepper-content step="2">
                            <v-row>
                            <!-- Deskripsi Reservasi -->
                            <v-col cols="12" sm="12">
                                <v-card
                                >
                                    <v-list-item>
                                    <v-list-item-content>
                                      <v-dialog
                                                v-model="dialog"
                                                width="700"
                                                >
                                                <template v-slot:activator="{ on }">
                                                <v-img
                                                :src="room.image"
                                                height="194"
                                                max-width="300"
                                                class="mx-1"
                                                v-on="on"
                                                ></v-img>
                                                </template>

                                                        
                                                        <v-img
                                                        :src="room.image"
                                                        >
                                                        <v-btn
                                                            dark
                                                            icon
                                                            @click="dialog = false"
                                                        >
                                                        <v-icon>mdi-close</v-icon>
                                                        </v-btn>
                                                        </v-img>
                                                </v-dialog>
                                        <v-list-item-title class="headline">{{room.title}}</v-list-item-title>
                                        <v-list-item-subtitle>Harga : {{room.harga|toCurrency}} / Jam</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>
                                            <div class="d-flex flex-no-wrap justify-space-between" >
                                            <v-card-text max-width="300">
                                                <!-- konfirmasi -->
                                                <v-form ref="form" @submit.prevent="submit">
                                                  <v-container v-for="item in foods" :key="item.id">
                                                        <v-img
                                                        :src="item.image"
                                                        height="194"
                                                        max-width="300"
                                                        class="mx-1"
                                                        ></v-img>
                                                    <v-col cols="12" sm="6">
                                                      <label><input type="checkbox" :id="item.id" :value="item" v-model="selected"> {{item.title}} | {{item.harga|toCurrency}} / Porsi</label>
                                                    </v-col>
                                                  </v-container>
                                                  <v-divider></v-divider>
                                                  <v-col class="pa-6" cols="6">
                                                  <template>
                                                    <div>
                                                    <span>Total : {{ total2}} (+ Ruangan)</span>
                                                    </div>
                                                    </template>
                                                  </v-col>
                                                    
                                                    
                                                <v-btn
                                                color="primary"
                                                class="ma-3"
                                                @click="e1 =3"
                                                
                                              >
                                                Selanjutnya
                                              </v-btn>
                                              <v-btn text @click="e1 = 1" class="ma-3">Kembali</v-btn>
                                              </v-form>
                                            </v-card-text>
                                            </div>
                                </v-card>
                            </v-col>
                            </v-row>
      </v-stepper-content>
        <!-- Stepper 3 -->
      <v-stepper-content step="3">
                            <v-row>
                              <!-- Deskripsi Reservasi -->
                              <v-col cols="12" sm="12">
                                                  
                                                </v-col>
                            <v-col cols="12" sm="12">
                              <v-card class="ma-3">
                                                    <v-card-text>
                                                      <div>Pemesanan</div>
                                                      <p class="display-1 text--primary">
                                                        {{room.title}}
                                                      </p>
                                                      <p class="caption text--primary">
                                                        Harga Sewa : {{room.harga|toCurrency}}
                                                      </p>
                                                      <p>Pre Order Makan:</p>
                                                      <div v-for="item in selected" :key="item.id">
                                                        <p>{{ item.title }}</p>
                                                      </div>
                                                      <div class="text--primary">
                                                        <p> Atas Nama : {{this.nama}}</p>
                                                        <!-- Lakukan pembayaran ke <br>
                                                        No. Rekening {{this.bank}}<br> -->
                                                        Dengan jumlah {{this.total2|toCurrency}}
                                                      </div>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                    </v-card-actions>
                                                  </v-card>
                                <v-card>
                                            <div class="d-flex flex-no-wrap justify-space-between" >
                                            <v-card-text max-width="300">
                                                <v-form ref="form" @submit.prevent="submit">
                                              
                                                <v-btn
                                                  color="primary"
                                                  class="ma-3"
                                                  type="submit" :loading="loading"
                                                >
                                                  Complete
                                                </v-btn>
                                                <v-btn text @click="e1 = 2" class="ma-3">Kembali</v-btn>
                                              </v-form>
                                            </v-card-text>
                                            </div>
                                                </v-card>                                              
                            </v-col>
                            
                            </v-row>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
    </template>
  </div>
  
</template>
<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
  export default {
    data () {
      return {
        menu2: false,
        e1: 0,
        dialog:false,
        nama: '',
        no_ktp: '',
        telp: '',
        tanggal:null,
        time: '',
        status: 'booked',
        bank:null,
        sewa: '',
        total: '',
        status_reservasi: 'diproses',
        // Rules input + rules date
        inputRules:[
                v => !!v || 'Input is required',
                v => (v && v.length >= 3) || 'Input must be more than 3 characters',
                ],
        dateRules:[
                v => !!v || 'Date is required'
                ],
        loading: false,
        snackbar: false,
        selected: [],
        }
    },
    watch:{
    
    sewa(newVal){
      this.total = newVal * this.room.harga
    },
   
    
  },
    props:['id'],
    computed:{
      foods (){
        return this.$store.getters.featuredFoods
    },
    // panggil data ruangan
    room (){
        return this.$store.getters.loadedRoom(this.id)
    },
    // panggil data bank
    banks (){
        return this.$store.getters.loadedBanks
    },
    reserv (){
      return this.$store.getters.loadedReserv
      
    },
    formattedDate(){
            return this.tanggal ? format(parseISO(this.tanggal), 'do MMM yyyy') : ''
        },
    checkin(){
      return this.formattedDate + ' ~ ' + this.time
    },
    total2() {
    return this.selected.reduce( (sum, addon) => sum - -addon.harga, 0) + this.total
    }
    
},

methods: {
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true;
          const reservasi = {
              id: this.id,
              nama: this.nama,
              no_ktp: this.no_ktp,
              telp: this.telp,
              tanggal: this.tanggal,
              waktu: this.time,
              checkin: this.checkin,
              status: this.status,
              bank: this.bank,
              sewa: this.sewa,
              total: this.total2,
              status_reservasi: this.status_reservasi
          }
          
      this.$store.dispatch('createReservasi', reservasi)
      this.loading = false;
      this.dialog = false;
      this.snackbar = true;
      this.$router.push('/konfirmasipelanggan');
      }
    },
    
  },
  
  }
</script>