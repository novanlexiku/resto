<template>
  <div class="footer">
    <v-footer
    class="py-4"
    dark
    height="auto"
    >
    <v-container mx-auto>
      <v-row wrap>
        <v-flex xs9>
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            :href="item.href"
            small
            color="primary"
            :style="styles"
            v-bind="$attrs"
            v-on="$listeners"
            class="ml-0 mr-3"
            square
            target="_blank"
          >
            <v-icon v-text="item.icon" />
          </v-btn>
        </v-flex>
        <v-spacer />
        <v-btn
          small
          color="primary"
          :style="styles"
          v-bind="$attrs"
          v-on="$listeners"
          class="mr-0"
          square
          title="Go to top"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-footer>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          href: 'https://twitter.com/Giliseafoodyk?s=08',
          icon: 'mdi-twitter'
        },
        {
          href: 'https://www.instagram.com/waroenggili/?igshid=1pqoe4b0exhm1',
          icon: 'mdi-instagram'
        },
        {
          href: 'https://www.facebook.com/waroenggiliseafood/',
          icon: 'mdi-facebook'
        },
        
      ]
    }),
    inheritAttrs: false,

    props: {
      square: Boolean
    },

    computed: {
      styles () {
        return {
          borderRadius: this.square ? '2px' : undefined
        }
      }
    }
  }
</script>
