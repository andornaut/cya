<template>
  <button :class="{'click-button--achieved': isAchieved, 'click-button': true}" type="button"
          @click="click(achievement)">
    <span v-if="!isEmpty" class="click-button__number">{{ numberOfClicks }}</span>
    <span :class="{'click-button__help': true, 'click-button__help--big': numberOfClicks === 0}">
      Click here!</span>
  </button>
</template>

<script>
  import { mapActions } from 'vuex'

  import { getNumberOfClicks, isAchieved, isEmpty } from '../achievement'
  import * as actionTypes from '../store/action-types'

  export default {
    props: ['achievement'],
    computed: {
      isAchieved () {
        return isAchieved(this.achievement)
      },
      isEmpty () {
        return isEmpty(this.achievement)
      },
      numberOfClicks () {
        return getNumberOfClicks(this.achievement)
      }
    },
    methods: mapActions([actionTypes.CLICK])
  }
</script>

<style>
  .click-button {
    align-items: center;
    background-color: #ffe000;
    border: 0.3em solid white;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 7.5em;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 7.5em;
  }

  .click-button:focus {
    outline: 0;
  }

  .click-button:hover {
    border-color: #7baaf7;
  }

  .click-button:hover:active {
    border-width: 0.4em;
  }

  .click-button--achieved {
    background-color: lightgreen;
  }

  .click-button__help {
    color: #7b724b;
  }

  .click-button__help--big {
    font-size: 1.5em;
    font-weight: bold;
  }

  .click-button__number {
    display: block;
    font-size: 2.4em;
    font-weight: bold;
  }
</style>
