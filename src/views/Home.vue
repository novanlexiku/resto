<template>
  <div id="home">
    <Articles>
      <Banner />
    </Articles>

    <Footer />
  </div>
</template>

<script>
import Articles from '@/components/home/Articles'
import Banner from '@/components/home/Banner'
import Footer from '@/components/home/Footer'



  export default {
    name: 'Home',

    components: {
      Articles,
      Banner,
      Footer
    }
  }
</script>
