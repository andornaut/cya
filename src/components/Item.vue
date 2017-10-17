<template>
  <li :class="{ 'item': true, 'item--achieved ': isAchieved }">
    <Description class="item__description" :achievement="achievement"></Description>
    <div class="item__actions">
      <ClickButton :achievement="achievement"></ClickButton>
      <router-link class="item__edit" :to="{ name: 'edit',  params: { id: achievement.id } }">Edit</router-link>
    </div>
  </li>
</template>
`
<script>
  import { isAchieved } from '../achievement'
  import ClickButton from './ClickButton'
  import Description from './Description'

  export default {
    props: ['achievement'],
    components: {
      ClickButton,
      Description
    },
    computed: {
      isAchieved () {
        return isAchieved(this.achievement)
      }
    }
  }
</script>

<style>
  .item {
    border-top: 0.3em solid #fff;
    display: flex;
    padding: 1.25rem 2.5rem 1.25rem 2.5rem;
  }

  .item--achieved {
    background: #d3ffd3 url('/static/img/checkmark.png') no-repeat center;
    background-size: contain;
  }

  .item__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item__description {
    flex-grow: 1;
    margin-right: 1.25rem;
  }

  .item__edit {
    display: inline-block;
    font-weight: bold;
    margin-top: 0.625rem;
  }
</style>
