<template>
  <div class="header">
    <div class="header__container">
      <h1 class="header__title">Interview</h1>
      <div class="header__btn-block">
        <router-link class="btn btn-list" to="/">Список опрошенных</router-link>
        <router-link class="btn btn-survey" to="/interview/">Пройти опрос</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderComponent',

}
</script>