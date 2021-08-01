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

  createNewTask(description = '') {
    const task = new Task(description)

    this._list[task.id] = task
  }
}

module.exports = Tasks
