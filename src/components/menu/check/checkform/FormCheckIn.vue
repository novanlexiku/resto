<template>
  <v-dialog max-width="800px" v-model="dialog">
        <template v-slot:activator="{on}">
                    <v-btn
                        v-on="on"
                        color="secondary"
                        class="mt-2"
                        outlined
                    >
                        Check-In
                    </v-btn>
        </template>
      <v-card>
            <v-card-title>
                <h4>Konfirmasi Check-In</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submit">
                    <v-text-field label="Nama Ruangan" v-model="nama" prepend-icon="mdi-account" outlined readonly></v-text-field>
                    <v-text-field label="Lama Sewa" v-model="sewa" suffix="jam" prepend-icon="mdi-arrow-right-bold-box-outline" outlined readonly></v-text-field>
                      <v-text-field v-model="konfirmasiCheckin" prepend-icon="mdi-calendar-clock" label="Tanggal dan Waktu Check-In" outlined readonly></v-text-field>
                                        <div class="ml-8">
                        <v-alert type="success">
                        Pelanggan sudah melakukan Pembayaran dan Konfirmasi
                        </v-alert>
                    </div>                    <v-btn text class="success ml-8 mt-3" type="submit" :loading="loading">check-in</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props:['checkin'],
  data () {
      return {
               time: '',
        total: this.checkin.total,
        nama: this.checkin.nama,
        sewa: this.checkin.sewa,
        status_reservasi: 'checkin',
        // Rules input + rules date
        inputRules:[
                v => !!v || 'Input is required',
                v => (v && v.length >= 3) || 'Input must be more than 3 characters',
                ],
        imageRules: [
            value => !value || value.size < 10000000 || 'Image size should be less than 10 MB!',
          ],
          dateRules:[
                v => !!v || 'Date is required'
                ],
        loading: false,
        dialog: false,
      }
    },
  computed:{
  
    
    konfirmasiCheckin(){
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes()
      var dateTime = date+' '+time;
      return dateTime
    },
  },
  methods: {
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true
          
          const checkin = {
              reservasi_id: this.checkin.id,
              nama: this.checkin.nama,
              status_reservasi: this.status_reservasi,
              waktu_checkin: this.konfirmasiCheckin,
              total: this.checkin.total          }
      this.$store.dispatch('checkin', checkin)
      this.loading = false;
      this.dialog = false;
      this.$emit('checkin');
      }
    },
    onPickFile () {
        this.$refs.fileInput.click()
      },
    onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]        

      }
  },

}
</script>

<style>

</style>