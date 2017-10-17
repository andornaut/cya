<template>
  <form class="form" @submit.prevent="save">
    <input
      class="form__name"
      id="name"
      name="name"
      placeholder="Eat a healthy breakfast"
      required
      v-focus
      v-model.trim="form.name"
      @input="reValidateName"/>
    <p v-if="errors.name" class="form__name--error">{{ errors.name }}</p>

    <ul class="form__goal-list">
      <li class="form__goal-item">
        <label for="noGoalRadio" class="form__goal-label">
          <input
            class="form__goal-type"
            type="radio"
            id="noGoalRadio"
            name="goalType"
            v-model="form.goalType"
            @change="reValidateGoal"/>
          <span class="form__description">
            <b>Just keep clicking</b><br>
            (no set goal)
          </span>
        </label>
      </li>

      <li class="form__goal-item">
        <label for="numberOfClicksRadio" class="form__goal-label">
          <input
            class="form__goal-type"
            type="radio"
            id="numberOfClicksRadio"
            name="goalType"
            value="NUMBER_OF_CLICKS"
            v-model="form.goalType"
            @change="reValidateGoal"/>
          <span class="form__description">
          Click
          <input
            class="form__amount"
            type="number"
            id="numberOfClicks"
            name="numberOfClicks"
            :required="form.goalType === 'NUMBER_OF_CLICKS'"
            min="1"
            v-model.number="form.numberOfClicks"
            @input="reValidateGoal"/>
          <b>times</b> in total</span>
        </label>
      </li>

      <li class="form__goal-item">
        <label for="clicksPerDayRadio" class="form__goal-label">
          <input
            class="form__goal-type"
            type="radio"
            id="clicksPerDayRadio"
            name="goalType"
            value="DAYS_IN_A_ROW"
            v-model="form.goalType"
            @change="reValidateGoal"/>
          <span class="form__description">
          Click
          <input
            class="form__amount"
            type="number"
            id="daysInARow"
            name="daysInARow"
            :required="form.goalType === 'DAYS_IN_A_ROW'"
            min="1"
            v-model.number="form.daysInARow"
            @input="reValidateGoal"/>
          <b>days</b> in a row</span>
        </label>
      </li>

      <li v-if="errors.goal" class="form__goal-item--error">{{ errors.goal }}</li>
    </ul>

    <div class="btn-group btn-group--split">
      <router-link to="/">Show me my achievements</router-link>
      <button class="btn btn--primary" type="submit" @click.prevent="save">Save</button>
    </div>

    <div v-if="id" class="btn-group form__dangerous">
      <button class="btn" type="button" @click="restart">Reset progress</button>
      <button class="btn" type="button" @click="remove">Delete</button>
    </div>
  </form>
</template>

<script>
  import * as actionTypes from '../store/action-types'
  import { mapActions, mapState } from 'vuex'

  const emptyErrors = {goal: null, name: null}

  export default {
    props: {id: Number},
    created () {
      this.init()
    },
    computed: {
      ...mapState(['achievement'])
    },
    data () {
      return {
        errors: JSON.parse(JSON.stringify(emptyErrors)),
        form: {} // `form` must be in "data", not "computed", in order for it to be reactive.
      }
    },
    directives: {
      focus: {
        inserted (el) {
          el.focus()
        }
      }
    },
    methods: {
      ...mapActions([actionTypes.ADD, actionTypes.EDIT, actionTypes.EMPTY, actionTypes.SET]),
      init () {
        this[this.id ? actionTypes.SET : actionTypes.EMPTY](this.id)
      },
      remove () {
        this.$store.dispatch(actionTypes.REMOVE, this.id)
        this.$router.push('/')
      },
      restart () {
        this.$store.dispatch(actionTypes.RESTART, this.achievement)
        this.$router.push('/')
      },
      reValidateGoal () {
        if (this.errors.goal) {
          this.validateGoal()
        }
      },
      reValidateName () {
        if (this.errors.name) {
          this.validateName()
        }
      },
      save () {
        const isGoalValid = this.validateGoal()
        const isNameValid = this.validateName()
        if (!isGoalValid || !isNameValid) {
          return
        }
        this[this.id ? actionTypes.EDIT : actionTypes.ADD](this.form)
        this.$router.push('/')
      },
      validateGoal () {
        if (!this.form.goalType ||
          (this.form.goalType === 'NUMBER_OF_CLICKS' && this.form.numberOfClicks > 0) ||
          (this.form.goalType === 'DAYS_IN_A_ROW' && this.form.daysInARow > 0)) {
          this.errors.goal = null
          return true
        }
        this.errors.goal = 'Specify a target number of clicks (greater than 0), or select "Just keep clicking"'
        return false
      },
      validateName () {
        if (this.form.name) {
          this.errors.name = null
          return true
        }
        this.errors.name = 'Name your goal. You can think of something!'
        return false
      }
    },
    watch: {
      achievement (achievement) {
        console.log('Changed achievement', achievement)
        this.errors = JSON.parse(JSON.stringify(emptyErrors))
        // Create a copy in order to ensure that the store's state isn't mutated directly.
        this.form = JSON.parse(JSON.stringify(achievement))
      },
      '$route': 'init'
    }
  }
</script>

<style>
  .form {
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
  }

  .form__amount {
    font-size: 1em;
    text-align: center;
    width: 3em;
  }

  .form__dangerous {
    background-color: lightsalmon;
    border-top: 0.5rem solid red;
    margin-top: 1.25rem;
    padding: 1.25rem 0;
  }

  .form__description {
    line-height: 1.5em;
    margin-top: 1rem;
  }

  .form__goal-item--error,
  .form__name--error {
    background-color: lightsalmon;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    color: darkred;
    margin: 0.5rem 0 0;
    padding: 0.5rem;
  }

  .form__goal-item {
    flex: 1 0 0;
  }

  .form__goal-item:not(:first-child) {
    margin-left: 1.25rem;
  }

  .form__goal-item--error {
    flex-basis: 100%;
  }

  .form__goal-label {
    background-color: #efdf9a;
    border-radius: 0.5rem;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    text-align: center;
  }

  .form__goal-list {
    box-sizing: border-box;
    display: flex;
    list-style: none;
    margin: 1.25rem 0;
    padding: 0;
    flex-wrap: wrap;
  }

  .form__goal-type {
    margin-top: 4px;
    transform: scale(1.5);
  }

  .form__name {
    box-sizing: border-box;
    font-size: 1em;
    padding: 0.5rem 1em 0.4em 1em;
    width: 100%;
  }
</style>
