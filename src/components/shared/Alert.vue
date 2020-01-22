<template>
<div>
<v-alert
      dismissible
      color="error"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-alert"
      :value="true"
    >
                    {{text}}
    </v-alert>
</div>

</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose (){
            this.$emit('dismissed')
        }
    }
}
</script>

<style>

</style>