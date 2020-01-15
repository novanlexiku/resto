<template>
  <v-container
    grid-list-xl
  >
  <!-- Card artikel -->
    <v-layout wrap>
      <v-flex xs12>
        <slot />
      </v-flex>

      <feed-card
        v-for="(food, i) in paginatedfoods"
        :key="food.id"
        :size="layout[i]"
        :value="food"
      />
    </v-layout>
<!-- Pagination -->
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
</template>

<script>
  

  export default {
    name: 'Explore',

    components: {
      FeedCard: () => import('@/components/menu/FeedExplore')
    },

    data: () => ({
      layout: [2, 2, 2, 2, 2, 2],
      page: 1
    }),

    computed: {
      foods () {
        return this.$store.getters.loadedFoods
      },
      pages () {
        return Math.ceil(this.foods.length / 6)
      },
      paginatedfoods () {
        const start = (this.page - 1) * 6
        const stop = this.page * 6
        return this.foods.slice(start, stop)
      }
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>
