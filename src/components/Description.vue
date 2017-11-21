<template>
  <div>
    <router-link class="description__name" :to="{ name: 'edit',  params: { id: achievement.id } }">
      {{ achievement.name }}
    </router-link>

    <div v-if="isEmpty" class="description__help">
      Click the circle on the right each time you make progress toward your goal. →
    </div>

    <progress v-else-if="hasGoal" class="description__progress-bar" :value="progress" :max="target"
              :data-text="progressText"></progress>

    <div v-else class="description__help">
      Keep clicking!
      <smalL>
        (
        <router-link :to="{ name: 'edit',  params: { id: achievement.id } }">You can also define a goal</router-link>
        )
      </smalL>
    </div>
  </div>
</template>

<script>
  import {getDaysInARow, getProgress, getTarget, getNumberOfClicks, isEmpty} from '../achievement'

  export default {
    props: ['achievement'],
    computed: {
      hasGoal () {
        return !!this.achievement.goalType
      },
      isEmpty () {
        return isEmpty(this.achievement)
      },
      progress () {
        return getProgress(this.achievement)
      },
      progressText () {
        if (this.achievement.goalType === 'DAYS_IN_A_ROW') {
          const daysInARow = getDaysInARow(this.achievement)
          return `${daysInARow} / ${this.achievement.daysInARow} days in a row`
        }

        if (this.achievement.goalType === 'NUMBER_OF_CLICKS') {
          const numberOfClicks = getNumberOfClicks(this.achievement)
          return `${numberOfClicks} / ${this.achievement.numberOfClicks}`
        }
      },
      target () {
        return getTarget(this.achievement)
      }
    }
  }
</script>

<style>
  .description__help {
    color: #7b724b;
    font-size: 1.3em;
  }

  a.description__name {
    color: #333;
    display: inline-block;
    font-size: 1.8em;
    font-weight: normal;
    margin: 0.5rem 0;
    text-decoration: none;
  }

  .description__progress-bar {
    border: 1px solid #7b724b;
    height: 1.5em;
    width: 100%;
  }

  .description__progress-bar[data-text]:after {
    color: #7b724b;
    content: attr(data-text);
    float: right;
    margin-right: -1px;
    padding: 0.25rem;
  }

  .description__progress-bar::-webkit-progress-bar {
    background-color: unset;
  }

  .description__progress-bar::-webkit-progress-value {
    background-color: #90ee90;
  }
</style>
