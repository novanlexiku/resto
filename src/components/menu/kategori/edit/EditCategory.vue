<template>
  <v-dialog max-width="800px" v-model="dialog">
        <template v-slot:activator="{on}">
             <v-chip
                      v-on="on"
                          class="text-uppercase mt-2"
                          color="secondary"
                          label
                          small
                        >
                      Edit
                    </v-chip>
        </template>
      <v-card>
            <v-card-title>
                <h4>Edit Kategori</h4>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form" @submit.prevent="submit">
                    <v-text-field label="Nama Kategori" v-model="title" prepend-icon="mdi-food" :rules="inputRules"></v-text-field>
                    <v-btn text class="primary ml-8 mt-3" type="submit" :loading="loading">Edit Kategori</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props:['category'],
  data () {
      return {
        title: this.category.title,
        // Rules input + rules date
        inputRules:[
                v => !!v || 'Input is required',
                v => (v && v.length >= 3) || 'Input must be more than 3 characters',
                ],
        imageRules: [
            value => !value || value.size < 10000000 || 'Image size should be less than 10 MB!',
          ],
        loading: false,
        dialog: false,
      }
    },
  computed:{

  },
  methods: {
    submit(){
      if(this.$refs.form.validate()){
          this.loading = true;
          const category = {
              id: this.category.id,
              title: this.title,
              value: this.title,
          }
      this.$store.dispatch('editCategory', category)
      this.loading = false;
      this.dialog = false;
      this.$emit('categoryEdit');
      }
    },
    
  },

}
</script>

<style>

</style>