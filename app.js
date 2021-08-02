require('colors')
const {
  inquirerMenu,
  pause,
  readInput,
  tasksToDeleteList,
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
          console.log('No tasks to show yet'.red)
          return
        }
        tasks.showCompleteList()
        break
      case 3:
        if (Object.keys(tasks._list).length === 0) {
          console.log('No tasks to show yet'.red)
          return
        }
        tasks.showCompletedTasks(true)
        break
      case 4:
        if (Object.keys(tasks._list).length === 0) {
          console.log('No tasks to show yet'.red)
          return
        }
        tasks.showCompletedTasks(false)
        break
      case 6:
        if (Object.keys(tasks._list).length === 0) {
          console.log('No tasks to delete yet'.red)
          return
        }
        const id = await tasksToDeleteList(tasks.arrayList)
        if (id !== 0) {
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
