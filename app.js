require('colors')
const { inquirerMenu, confirmation, readInput } = require('./helpers/inquirer')
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
        console.log(tasks.arrayList)
        break
    }

    saveInfo(tasks.arrayList)

    option !== 7 && (await confirmation())
  } while (option !== 7)
}

main()
