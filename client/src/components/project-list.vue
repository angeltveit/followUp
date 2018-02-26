<template>
  <div id="project-list">
    <div class="header">
      <div class="add" v-on:click="add()">+</div>
      <h1>Did you followUp?</h1>
    </div>
    <div
      class="project"
      v-for="(item, index) in ordered"
      v-on:click="setDone(item)"
    >
      <div
        class="sonar sonar-stroke sonar-slow sonar-infinite sonar-danger"
        v-if="!isFollowedUp(item)"
      ></div>
      <div class="project-details">{{ item.title }}</div>
    </div>
    <!--<button v-on:click="clear()">Delete all</button>-->
  </div>

</template>

<script>
import page from 'page'
import moment from 'moment'
import db from '../services/db'

export default {
  name: 'ProjectList',
  beforeMount() {
    const data = localStorage.data
    this.loadData()
  },
  methods: {
    setDone(item) {
      if(item.followedUp) {
        item.followedUp = false
      } else {
        item.followedUp = new Date()
      }
      this.save(item)
    },
    loadData() {
      db.projects.toArray((projects)=> {
        this.projects = projects
        console.log('Projects loaded')
      })
    },
    save(item) {
      db.projects.update(item.title, { followedUp: item.followedUp })
    },
    add() {
      page('/create')
    },
    isFollowedUp(item) {
      if(!item.followedUp) return
      return moment().isSame(moment(item.followedUp), 'day')
    },
    clear() {
      db.delete()
    },
  },
  computed: {
    ordered: {
      get: function() {
        return (this.projects || []).sort((a,b) => {
          return new Date(a.followedUp) - new Date(b.followedUp)
        })
      }
    },
  },
  data () {
    return {
      projects: [],
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
}
.sonar {
  border-radius: 50%;
  background-color: #DE342F;
  color: #DE342F;
  height: 0.25em;
  width: 0.25em;
  margin: 0 1em;
}
.project {
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(255,255,255,.05);
  height: 2.5em;
  padding: 0 1em;
}
.add {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1em;
  border: 1px solid rgba(255,255,255, .3);
  border-radius: 50%;
  color: rgba(255,255,255, .3);
  font-size: 1.2em;
  height: 1.5em;
  width: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
