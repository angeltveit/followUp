import Vue from 'vue'
import ProjectList from './components/project-list.vue'
import CreateProject from './components/create-project.vue'
import page from 'page'

const instance = new Vue({
  el: '#app',
  beforeMount() {
    console.log('Creating routes')
    page.base(window.location.pathname)
    page('/create', () => {
      this.setRoute(CreateProject)
    })
    page('/', () => {
      console.log('Set route to /')
      this.setRoute(ProjectList)
    })
    page({ hashbang: true })
  },
  data: {
    route: '',
  },
  methods: {
    setRoute(c) {
      if(!c) return
      this.route = c
    },
  },
  render(h) {
    console.log('h',this)
    if(!this.route) return
    return h(this.route)
  }
})
