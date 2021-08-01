require('colors')
const inquirer = require('inquirer')

const menuOpts = [
  {
    type: 'list',
    name: 'option',
    message: 'Select an option: ',
    choices: [
      { value: 1, name: '1. Create task' },
      { value: 2, name: '2. Show all tasks' },
      { value: 3, name: '3. Show completed tasks' },
      { value: 4, name: '4. Show pending tasks' },
      { value: 5, name: '5. Complete tasks' },
      { value: 6, name: '6. Delete task' },
      { value: 7, name: '7. Exit' },
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

const confirmation = async () => {
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

module.exports = { inquirerMenu, confirmation, readInput }
