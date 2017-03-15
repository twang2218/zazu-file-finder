const app2png = require('app2png')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const File = require('../../lib/file')

const sha1sum = (input) => crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')

class MacFile extends File {
  constructor (filePath, name, cwd = '.') {
    super(filePath, name)
    this.iconPath = path.join(cwd, `./data/icons/${this.name}-${sha1sum(filePath)}.png`)
  }

  icon () {
    return this.hasIcon() ? this.iconPath : 'fa-file'
  }

  generateIcon () {
    if (this.hasIcon()) return Promise.resolve()
    return app2png.convert(this.path, this.iconPath)
  }

  hasIcon () {
    return fs.existsSync(this.iconPath)
  }
}

module.exports = MacFile
