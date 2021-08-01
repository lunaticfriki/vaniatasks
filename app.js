require('colors')
const { inquirerMenu, confirmation } = require('./helpers/inquirer')

const main = async () => {
  let option = ''

  do {
    option = await inquirerMenu()
    option !== 0 && (await confirmation())
  } while (option !== 0)
}

main()
