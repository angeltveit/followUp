<template>
  <div id="create-project">
    <div class="header">
      <div class="btn txt back" v-on:click="cancel()">cancel</div>
      <h1>Create followUp {{ project.title }}</h1>
    </div>
    <div class="label">Project name:</div>
    <input type="text" v-model="project.title" />
    <button v-on:click="save()">Save this shit</button>
  </div>
</template>

<script>
import db from '../services/db'
import page from 'page'

export default {
  name: 'CreateProject',
  beforeCreate() {
    const data = localStorage.data
    this.data = data ? JSON.parse(data) : []
  },
  data() {
    return {
      project: {
        title: '',
        followedUp: false,
      }
    }
  },
  methods: {
    save() {
      db.projects.add(this.project).then(()=> {
        page('/')
      })
      this.project = {}
    },
    cancel() {
      this.project = {}
      page('/')
    },
  }
}
</script>

<style scoped>
  #create-project {
    padding: 0 1em;
  }
  input {
    padding: 0.5em 1em;
  }
  .header {
    position: relative;
  }
  .round {
    border: 1px solid rgba(255,255,255, .3);
    border-radius: 50%;
  }
  .btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255, .3);
    font-size: 1.2em;
    height: 1.5em;
    width: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .txt {
    font-size: 0.8em;
    font-weight: bolder;
    text-transform: uppercase;
    right: 2em !important;
  }
  .back {
    right: 1em;
  }
</style>
