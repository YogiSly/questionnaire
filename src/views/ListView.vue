<template>
  <div class="table">
    <div class="table-header">
      <div class="table-header__field">Full Name</div>
      <div class="table-header__field">E-mail</div>
      <div class="table-header__field">Phone</div>
      <div class="table-header__field">Result</div>
    </div>
    <div class="table-row" v-for="user in users.slice().reverse()" :key=" user.id">
      <div class="table-row__field">{{ user.name }}</div>
      <div class="table-row__field">{{ user.mail }}</div>
      <div class="table-row__field">{{ user.phone }}</div>
      <div class="table-row__field">{{ user.result }}</div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    users() {
      return this.$store.getters["GET_USERS"];
    }
  },
  mounted() {
    this.$store.dispatch("LOAD_USERS");
  }
}
</script>