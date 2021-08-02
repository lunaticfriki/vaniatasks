require('colors')
const inquirer = require('inquirer')

const menuOpts = [
  {
    type: 'list',
    name: 'option',
    message: 'Select an option: ',
    choices: [
      { value: 1, name: `${'1.'.magenta} Create task` },
      { value: 2, name: `${'2.'.magenta} Show all tasks` },
      { value: 3, name: `${'3.'.magenta} Show completed tasks` },
      { value: 4, name: `${'4.'.magenta} Show pending tasks` },
      { value: 5, name: `${'5.'.magenta} Complete tasks` },
      { value: 6, name: `${'6.'.magenta} Delete task` },
      { value: 7, name: `${'7.'.magenta} Exit` },
    ],
  },
]

const inquirerMenu = async () => {
  console.clear()
  /**
   * Don't touch this logs in order to see a beautiful aligned heading :D
   */
  console.log(' =============================='.yellow)
  console.log(` === ${'WELCOME TO VANIATASKS!'.toUpperCase()} ===`.rainbow)
  console.log(' ==============================\n'.yellow)
  /**
   * End of the beautiful aligned heading ^_^
   */

  const { option } = await inquirer.prompt(menuOpts)

  return option
}

const pause = async () => {
  const confirmationQuestion = [
    {
      type: 'input',
      name: 'confirmation',
      message: `Press ${'ENTER'.magenta} to confirm`,
    },
  ]
  console.log('\n')
  return await inquirer.prompt(confirmationQuestion)
}

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please, enter some value'
        }
        return true
      },
    },
  ]
  const { description } = await inquirer.prompt(question)
  return description
}

const tasksToDeleteList = async (tasks = []) => {
  const choices = tasks.map((task, idx) => {
    const index = `${idx + 1}.`.magenta

    return {
      value: task.id,
      name: `${index} ${task.description}: ${
        task.completedIn
          ? `Completed in ${task.completedIn}`.green
          : 'Pending'.red
      }`,
    }
  })

  choices.unshift({
    value: 0,
    name: `${'0'.magenta}. Cancel`,
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices,
    },
  ]

  const { id } = await inquirer.prompt(questions)

  return id
}

const confirmChoice = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]

  const { ok } = await inquirer.prompt(question)

  return ok
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  tasksToDeleteList,
  confirmChoice,
}
