import ProjectList from './components/project-list.vue'
import CreateProject from './components/create-project.vue'

export default function(page) {
  const routes = {
    'projects': ProjectList,
    'create': CreateProject,
  }
  return routes[page]
}
