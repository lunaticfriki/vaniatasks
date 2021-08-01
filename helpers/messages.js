require('colors')

const showMenu = () => {
  return new Promise((resolve, reject) => {
    /**
     * Don't touch this logs in order to see a beautiful aligned heading :D
     */
    console.log('\n  WELCOME TO VANIATASKS!\n'.rainbow)
    console.log(' ========================'.yellow)
    console.log(` === ${'Choose an option'.toUpperCase()} ===`.magenta)
    console.log(' ========================\n'.yellow)
    /**
     * End of the beautiful aligned heading ^_^
     */

    console.log(`${'1.'.rainbow} Create task`)
    console.log(`${'2.'.rainbow} Show all tasks`)
    console.log(`${'3.'.rainbow} Show completed tasks`)
    console.log(`${'4.'.rainbow} Show pending tasks`)
    console.log(`${'5.'.rainbow} Complete tasks`)
    console.log(`${'6.'.rainbow} Delete a task`)
    console.log(`${'0.'.rainbow} Exit\n`)

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    readline.question('Please, choose an option: ', (option) => {
      readline.close()
      resolve(option)
    })
  })
}

const pause = () => {
  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    readline.question(`Press ${'ENTER'.magenta} to continue: `, () => {
      readline.close()
      resolve()
    })
  })
}

module.exports = { showMenu, pause }
