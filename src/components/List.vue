<template>
  <div class="list">
    <nav class="btn-group">
      <router-link to="/add">Add an achievement</router-link>
    </nav>

    <div v-if="isEmpty" class="list__empty">
      <p>You haven't added any achievements.</p>
      <p>It's easy! Click the link above to <router-link to="/add">get started</router-link>.</p>

      <h2>Why?</h2>
      <p>Keeping track of your goals can help you to reach them by providing a little extra motivation and
        accountability.</p>
      <p>Each time you "click", you'll hopefully be rewarded with a feeling of accomplishment.</p>
      <p>Stay focused on your goals, and soon you'll be turning them into achievements!</p>
    </div>

    <ul class="list__list" v-else>
      <Item :achievement="achievement" v-for="achievement in orderedAchievements" :key="achievement.id"></Item>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Item from './Item'

  export default {
    components: {
      Item
    },
    computed: {
      ...mapState(['achievements']),
      isEmpty () {
        return this.achievements.length === 0
      },
      orderedAchievements () {
        return this.achievements.slice().reverse()
      }
    }
  }
</script>

<style>
  .list__empty {
    color: #7b724b;
    font-size: 1.5em;
    padding-left: 1.25rem;
  }

  .list__list {
    list-style: none;
    margin: 1.25rem -2.5rem 0 -2.5rem;
    padding: 0;
  }
</style>
