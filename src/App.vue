<template>
<header-component></header-component>
<bread-crumb-component></bread-crumb-component>
  <router-view></router-view>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import BreadCrumbComponent from './components/BreadCrumbComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    BreadCrumbComponent
  }
}
</script>

