require('colors')
const Task = require('./task')

class Tasks {
  _list = {}

  get arrayList() {
    const list = []

    Object.keys(this._list).forEach((key) => {
      const task = this._list[key]
      list.push(task)
    })

    return list
  }

  constructor() {
    this._list = {}
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task
    })
  }

  createNewTask(description = '') {
    const task = new Task(description)

    this._list[task.id] = task
  }

  showList(list) {
    console.log()
    list.map((el, index) => {
      const i = `${index + 1}`.green
      const description = el.description
      const state =
        el.completedIn !== null
          ? `Completed in ${el.completedIn}`.green
          : 'Pending'.magenta

      console.log(`${i}. ${description}: ${state}`)
    })
  }

  showCompleteList() {
    this.showList(this.arrayList)
  }

  showCompletedTasks(completed = true) {
    const completedTasks = this.arrayList.filter((el) =>
      completed ? el.completedIn !== null : el.completedIn === null
    )
    this.showList(completedTasks)
  }

  deleteTasks(id = '') {
    if (this._list[id]) {
      delete this._list[id]
    }
  }
}

module.exports = Tasks
