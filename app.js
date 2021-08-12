#! /usr/bin/env node

require('colors')
const {
  inquirerMenu,
  pause,
  readInput,
  tasksToDeleteList,
  tasksToComplete,
  confirmChoice,
} = require('./helpers/inquirer')
const { saveInfo, readInfo } = require('./helpers/saveFIle')
const Tasks = require('./models/tasks')

const main = async () => {
  let option = ''
  const tasks = new Tasks()

  const tasksDB = readInfo()

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB)
  }

  do {
    option = await inquirerMenu()

    switch (option) {
      case 1:
        const description = await readInput('Description:')
        tasks.createNewTask(description)
        break
      case 2:
        if (Object.keys(tasks._list).length === 0) {
          console.log('\n No tasks to show yet'.red)
        }
        tasks.showCompleteList()
        break
      case 3:
        if (tasks.getCompletedTasks().length === 0) {
          console.log('\n No tasks completed yet'.red)
        }
        tasks.showCompletedTasks(true)
        break
      case 4:
        if (tasks.getCompletedTasks(false).length === 0) {
          console.log('\n No pending tasks to show'.red)
        }
        tasks.showCompletedTasks(false)
        break
      case 5:
        if (Object.keys(tasks._list).length === 0) {
          console.log('\n No tasks to show yet'.red)
        }
        const ids = await tasksToComplete(tasks.arrayList)
        tasks.completeTasks(ids)

        break
      case 6:
        if (Object.keys(tasks._list).length === 0) {
          console.log('\n No tasks to delete yet'.red)
        }
        const id = await tasksToDeleteList(tasks.arrayList)
        if (id !== tasks.arrayList.length + 1) {
          const confirmation = await confirmChoice('Are you sure?')
          confirmation && tasks.deleteTasks(id)
        }
        break
    }

    saveInfo(tasks.arrayList)

    option !== 7 && (await pause())
  } while (option !== 7)
}

main()
