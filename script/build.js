const args = require('minimist')(process.argv.slice(2))
const { build } = require('esbuild')
const { resolve, relative } = require('path')
const target = args._[0] || 'reactivity'
const format = args.f || 'global'
const outputFormat = format.startsWith('global')
? 'iife'
: format === 'cjs'
? 'cjs'
: 'esm'
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))
const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.js`
)
const relativeOutfile = relative(process.cwd(), outfile)
build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  outfile,
  format: outputFormat,
  globalName: pkg.buildOptions?.name,
  watch: {
    onRebuild(error) {
      if (!error) console.log(`rebuilt: ${relativeOutfile}`)
    }
  }
}).then(() => {
  console.log(`watching: ${relativeOutfile}`)
})
