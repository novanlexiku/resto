<template>
  <div class="foods">
      <v-container class="my-5">
        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" top color="success">
          <span>Data Makanan berhasil ditambahkan</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbar2" top color="alert">
          <span>Data Makanan berhasil dihapus</span>
          <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
        </v-snackbar>
          <!-- Sort data + tooltip -->
           <v-row class="mb-3">
            <v-tooltip top>
            <template v-slot:activator="{on}">
                <v-btn small text color="grey" @click="sortByB('title')" v-on="on">
                <v-icon left small>mdi-folder</v-icon>
                <span class="caption text-lowercase">By food name</span>
            </v-btn>
            </template>
            <span>Sort foods by food name</span>
            </v-tooltip>
            
            
            <v-spacer></v-spacer>
            <Popup @foodAdded="snackbar=true" />
           </v-row>
          <!-- Grid data with chip -->
          <v-card flat class="pa-3" v-for="food in paginatedArticles" :key="food.id">
              <v-row wrap :class="`pa-3 food ${food.status}`">
                  <v-col cols="12" md="2">
                      <div class="caption grey--text">Nama Makanan</div>
                      <div>{{food.title}}</div>
                  </v-col>
                  <v-col cols="6" md="2">
                      <div class="caption grey--text">Harga/Porsi</div>
                      <div>{{food.harga|toCurrency}}</div>
                  </v-col>
                  <v-col cols="6" md="2">
                      <div class="caption grey--text">Fitur</div>
                      <div>{{food.deskripsi}}</div>
                  </v-col>
                  <v-col cols="6" md="2">
                      <div class="caption grey--text">Gambar</div>
                      <div class="justify-end"><v-img aspect-ratio="1" :src="food.image"></v-img></div>
                  </v-col>
                 
                  <v-col cols="6" md="4">
                        <div class="caption grey--text">Aksi</div>
                        <div justify="space-between">
                                              
                    <Edit :food="food" @foodEdit="snackbar=true"/>
                    <Delete :food="food" @deleteFood="snackbar2=true"/>
                    </div>
                  </v-col>
              </v-row>
            <v-divider></v-divider>
          </v-card>
          <!-- Pagination start here -->
          <v-row align-center>
            <v-col cols="3">
              <v-btn
                v-if="page !== 1"
                class="ml-0"
                title="Previous page"
                small
                color="primary"
                v-bind="$attrs"
                v-on="$listeners"
                square
                @click="page--"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-col>

            <v-col
              cols="6"
              class="text-center subtitle-1"
            >
              PAGE {{ page }} OF {{ pages }}
            </v-col>

            <v-col
              cols="3"
              class="text-right"
            >
              <v-btn
                v-if="pages > 1 && page < pages"
                class="mr-0"
                title="Next page"
                small
                color="primary"
                v-bind="$attrs"
                v-on="$listeners"
                square
                @click="page++"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
      </v-container>
  </div>
</template>
 
<script>

import Edit from '../food/edit/EditFoodDetails'
import Popup from '../food/AddFood'
import Delete from '../food/delete/DeleteFoods'

export default {
  components: {Popup, Edit, Delete},
    data: () => ({
      page: 1,
      snackbar: false,
      snackbar2: false
    }),
    // sort method
    methods:{
        sortByA(prop){
      this.foods.sort((a,b) => a[prop] < b[prop] ? -1:1)
    },
    sortByB(prop){
      this.foods.sort((a,b) => a[prop] < b[prop] ? -1:1)
    },
    onLoadFood(id){
        this.$router.push('/foods/' + id)
      }
    },
    
    // Pagination settings
    computed: {
      foods () {
        return this.$store.getters.featuredFoods
      },
      pages () {
        return Math.ceil(this.foods.length / 5)
      },
      paginatedArticles () {
        const start = (this.page - 1) * 5
        const stop = this.page * 5

        return this.foods.slice(start, stop)
      },
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      }
    },
    inheritAttrs: false,

    props: {
      square: Boolean
    },
    
}
</script>

<style>
.food.available {
  border-left : 4px solid green;
}
.food.booked {
  border-left : 4px solid orange;
}
.food.maintenance {
  border-left : 4px solid red;
}
.v-chip.available {
  background :  green;
}
.v-chip.booked {
  background:  orange;
}
.v-chip.maintenance {
  background :  red;
}
</style>