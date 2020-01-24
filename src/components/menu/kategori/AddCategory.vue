<template>
  <v-dialog max-width="800px" v-model="dialog">
        <template v-slot:activator="{on}">
            <v-btn small text v-on="on" color="grey">
                <span class="subtitle-2">Tambah Kategori</span>
                <v-icon right small>mdi-plus-box</v-icon>
            </v-btn>
        </template>
      <v-card>
            <v-card-title>
                <h4>Tambah Kategori</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submit">
                    <v-text-field label="Nama Kategori" v-model="title" prepend-icon="mdi-food" :rules="inputRules"></v-text-field>
                    <v-btn text class="primary ml-8 mt-3" type="submit" :loading="loading">Tambah Category</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
  data: () => ({
    title: '',
    // Rules input + rules date
    inputRules:[
            v => !!v || 'Input is required',
            v => (v && v.length >= 3) || 'Input must be more than 3 characters',
            ],
            
    loading: false,
    dialog: false,
  }),
  computed:{

  },
  methods: {
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true;
          const category = {
              title: this.title,
              value: this.title,
          }
      this.$store.dispatch('createCategory', category)
      this.loading = false;
      this.dialog = false;
      this.$emit('categoryAdded');
      this.$refs.form.reset();
      }
    },
    
  },

}
</script>

<style>

</style>