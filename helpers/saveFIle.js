const fs = require('fs')

const file = './db/data.json'

const saveInfo = (data) => {
  fs.writeFileSync(file, JSON.stringify(data))
}

const readInfo = () => {
  const data = !fs.existsSync(file)
    ? null
    : JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }))
  console.log(data)
  return data
}

module.exports = {
  saveInfo,
  readInfo,
}
