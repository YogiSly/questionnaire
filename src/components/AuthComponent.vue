<template>
  <div class="auth">
    <form @submit.prevent="submit" class="auth__form" >
      <label for="name" class="auth__label">Full Name</label>
      <input type="" name="name" class="auth__auth" placeholder="Full Name" v-model="v$.name.$model">
      <span v-for="error in v$.name.$errors" :key="error.$uid">{{error.$message}}</span>
      <label for="mail" class="auth__label">E-mail</label>
      <input type="text" name="mail" class="auth__auth" placeholder="E-mail" v-model="email">
      <span v-for="error in v$.email.$errors" :key="error.$uid">{{error.$message}}</span>
      <label for="phone" class="auth__label">Phone</label>
      <input type="text" name="phone" class="auth__auth" placeholder="Phone" v-model="phone">
      <span v-for="error in v$.phone.$errors" :key="error.$uid">{{error.$message}}</span>
      <div class="auth__btns">
        <router-link class="btn btn-list" to="/">Вернуться к списку</router-link>
        <button class="btn btn-send">Начать опрос</button>
      </div>
    </form>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, alpha, numeric } from '@vuelidate/validators'
//import { minLength } from "../validators/minLength.js";
//import { helpers } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
    }
  },
  validations() {
    return {
      name: { required, minLength: minLength(2), alpha },
      email: { required, email },
      phone: { required, numeric, minLength: minLength(6) }
    }
  },
  methods: {

    async submit() {
      const isFormCorrect = await this.v$.$validate();
       if (!isFormCorrect) return;
      const message = {
        name: this.name,
        phone: this.phone,
        email: this.email
      };
      this.$store.dispatch("ADD_USER", message)
      .then(
        ((this.name = ""),
          (this.email = ""),
          (this.phone = ""))
      )
      .then( this.$store.dispatch("SET_AUTH_HIDE"));
    },
  },
}
</script>