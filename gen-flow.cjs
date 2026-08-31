// Generates Flow definitions (dist/**/*.js.flow) from the emitted .d.ts files.
// CommonJS because flowgen has no ESM entry point.
const {beautify, compiler} = require('flowgen')
const fs = require('node:fs')
const path = require('node:path')

for (const file of fs.globSync('dist/**/*.d.ts')) {
  const flowdef = beautify(compiler.compileDefinitionFile(file))
  const parsed = path.parse(file)
  const name = /(.*)\.d/.exec(parsed.name)[1]
  fs.writeFileSync(`${parsed.dir}/${name}.js.flow`, `//@flow\n${flowdef}`)
}
