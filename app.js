require('colors')
const { inquirerMenu, confirmation, readInput } = require('./helpers/inquirer')
const Tasks = require('./models/tasks')

const main = async () => {
  let option = ''
  const tasks = new Tasks()
  do {
    option = await inquirerMenu()

    switch (option) {
      case 1:
        const description = await readInput('Description:')
        tasks.createNewTask(description)
        break
      case 2:
        console.log(tasks._list)
        break
    }
    option !== 7 && (await confirmation())
  } while (option !== 7)
}

main()
