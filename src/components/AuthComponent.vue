<template>
  <div class="auth">
    <form @submit.prevent="submit" class="auth__form">
      <div class="auth__block">
        <label for="name" class="auth__label">Full Name</label>
        <input type="" name="name" class="auth__auth" placeholder="Full Name" v-model="name">
        <div class="auth__error">
          <span v-for="error in v$.name.$errors" :key="error.$uid">{{error.$message}}</span>
        </div>
      </div>
      <div class="auth__block">
        <label for="mail" class="auth__label">E-mail</label>
        <input type="text" name="mail" class="auth__auth" placeholder="E-mail" v-model="email">
        <div class="auth__error">
          <span v-for="error in v$.email.$errors" :key="error.$uid">{{error.$message}}</span>
        </div>
      </div>
      <div class="auth__block">
        <label for="phone" class="auth__label">Phone</label>
        <input type="text" name="phone" class="auth__auth" placeholder="+7(999)-999-9999" v-mask="'+7(###)-###-####'"
          v-model="phone">
        <div class="auth__error">
          <span v-for="error in v$.phone.$errors" :key="error.$uid">{{error.$message}}</span>
        </div>
      </div>
      <div class="auth__btns">
        <router-link class="btn btn-list" to="/">Вернуться к списку</router-link>
        <button class="btn btn-send">Начать опрос</button>
      </div>
    </form>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { helpers } from "@vuelidate/validators";
import { twoWords } from "../validators/twoWords";
import { cyrillic } from "../validators/cyrillic";

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      timeAndDate:''
    }
  },
  validations() {
    return {
      name: { required: helpers.withMessage("Поле обязательное для ввода", required), minLength: helpers.withMessage("Введите не менее 5 символов", minLength(5)), twoWords: helpers.withMessage('Введите Имя, Фамилию', twoWords), cyrillic: helpers.withMessage('Введите символы русского или английского алфавита', cyrillic) },
      email: { required: helpers.withMessage("Поле обязательное для ввода", required), email: helpers.withMessage("Значение не является действительным адресом электронной почты", email) }, 

      phone: { required: helpers.withMessage("Поле обязательное для ввода", required),  minLength: helpers.withMessage("Введите не менее 11 цифр", minLength(16)) }

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
      .then( this.$store.dispatch("SET_AUTH_HIDE"))
      .then(this.$store.dispatch("LOAD_QUESTIONS"));
    },
  },
}
</script>