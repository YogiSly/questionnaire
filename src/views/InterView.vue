<template>
  <div class="interview">
    <auth-component v-if="!authShow" />
    <div class="questions" v-else>
      <span class="questions__title">Вопросы:</span>
      <div class="questions__block">
        <div class="questions__question" v-for="question in questions" :key="question.id"
          :class="{active: question.isActive, done:question.done}" @click="choiseQuestion(question.id)">
          <hr class="questions__hr">
          <div class="questions__attr">
            <img class="questions__img" src="@/assets/images/circle-active.svg" alt="" v-if="question.isActive">
            <img class="questions__img" src="@/assets/images/circle-done.svg" alt="" v-else-if="question.done">
            <img class="questions__img" src="@/assets/images/circle.svg" alt="" v-else>
            <span class="questions__text">Вопрос {{question.id }}</span>
          </div>
        </div>

      </div>
      <div class="questions__container">
        <div class="questions__name" v-for="question in questions" :key="question.id" v-show="question.isActive">
          {{question.name}}
          <input type="text" class="questions__input" v-model="answer" @change="answerCurrent"
            v-if="question.type == 'text'">
          <select class="questions__input" v-else-if="question.type == 'dropdown'" v-model="answer"
            @change="answerCurrent">
            <option value="">Выберите один из вариантов</option>
            <option v-for="variant,index in  question.variants" :key="index" :value="index">{{variant}}</option>
          </select>
          <div class="questions__inner" v-else-if="question.type == 'radio'">
            <div class="questions__radio" v-for="variant,index in  question.variants" :key="index">
              <input type="radio" :id="index" :value="index" v-model="answer" @change="answerCurrent">
              <label :for="index">{{ variant }}</label>
            </div>
          </div>
          <input type="number" class="questions__input" v-model="answer" @change="answerCurrent"
            v-else-if="question.type == 'number'">
          <div class="questions__inner" v-else-if="question.type == 'checkbox'">
            <div class="questions__checkbox" v-for="variant,index in  question.variants" :key="index">
              <input type="checkbox" :id="`chkbx-${question.id}-${index}`" :value="variant" @change="answerChecked"
                v-model="checkedAnswer">
              <label :for="`chkbx-${question.id}-${index}`">{{ variant }}</label>
            </div>
          </div>
        </div>

        <div class="questions__btn-block">
          <button class="btn btn-prev" @click="prevQuestion(this.activeQuestion)">Вернуться назад</button>
          <button class="btn btn-next" @click="nextQuestion(this.activeQuestion)"
            v-if="this.activeQuestion < questions.length">Следующий</button>
          <button class="btn btn-next" @click="finishQuestion(this.activeQuestion)" v-else>Завершить</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthComponent from '../components/AuthComponent.vue'
export default {
  components: {
    AuthComponent
  },
  data(){
    return {
      answer: '',
      checkedAnswer:[]
    }
  },
  computed: {
    authShow() {
      return this.$store.getters["GET_AUTH_SHOW"];
    },
    questions() {
      return this.$store.getters["GET_QUESTIONS"];
    },
    activeQuestion() {
      return this.$store.getters["GET_ACTIVE"];
    },
    thisAnswer() {
      return this.$store.getters["GET_ANSWER"];
    },
    user(){
      return this.$store.getters["GET_USER"];
    }
  },
  methods:{
    answerCurrent() {
      if (this.answer != '') {
        this.$store.dispatch("SET_ANSWER", { id: +this.activeQuestion, answer: this.answer });
        this.$store.dispatch("SET_DONE", this.activeQuestion);
      }
    },
    answerChecked(){
      this.$store.dispatch("SET_ANSWER", { id: +this.activeQuestion, answer: this.answerChecked });
      this.$store.dispatch("SET_DONE", this.activeQuestion);
    },
    nextQuestion(id){
      if (id < this.questions.length) {
        let curQues = this.thisAnswer.find((answ) => answ.id == +id + 1)
        curQues != undefined ? this.answer = curQues.answer : this.answer = '';
        ++id
        this.$store.dispatch("SET_ACTIVE", id);
        this.$store.dispatch("SET_QUESTION", id);
      }
    },
    prevQuestion(id) {
      if (id > 1) {
        let curQues = this.thisAnswer.find((answ) => answ.id == +id - 1)
        curQues != undefined ? this.answer = curQues.answer : this.answer = '';
        --id
        this.$store.dispatch("SET_ACTIVE", id);
        this.$store.dispatch("SET_QUESTION", id);
      }
    },
    choiseQuestion(id){
      let curQues = this.thisAnswer.find((answ) => answ.id == +id)
      curQues != undefined ? this.answer = curQues.answer : this.answer = '';
      this.$store.dispatch("SET_ACTIVE", id);
      this.$store.dispatch("SET_QUESTION", id);
    },
    finishQuestion(){
      this.$store.dispatch("SET_QUESTION", this.activeQuestion)
      .then(()=>{
        let answered = 0;
        this.questions.forEach(element => {
          if (element.done == true) { ++answered }
        });
        let newUser = {
          name: this.user.name,
          mail: this.user.email,
          phone: this.user.phone,
          result: answered + "/" + this.questions.length,
        }
        this.$store.dispatch("ADD_USER_ANSWER", newUser);
      })
      .then(()=>{
        this.$router.push('/')
      })
     
    }
  },
  mounted() {
    this.$store.dispatch("LOAD_QUESTIONS");
  }
}
</script>