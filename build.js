const fs = require('fs')
const http = require('http')
const join = require('path').join

const consolidate = require('consolidate')
const highlight = require('highlight.js')
const Marked = require('marked')
const mkdirp = require('mkdirp')

const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

module.exports = {
  build,
  serve
}

/**
 * build(options)
 * ==============
 *
 * Build the static site based on the site configuration in package.json
 */
function build (options = {}) {
  const {
    pages = [],
    root = '',
    dist = '',
    template = 'layout',
    marked = {},
    viewEngine = 'pug',
    locals = {}
  } = options

  console.log(`Building with options:\n\n${JSON.stringify(options, null, 2)}\n\n`)

  // Load files relative to the root dir
  const rootDir = join(process.cwd(), root)

  // Output files relative to the dist dir
  const distDir = join(process.cwd(), dist)

  // Read the default template file
  const defaultTemplatePath = join(rootDir, `${template}.${viewEngine}`)
  console.log(`Path to default template is: ${defaultTemplatePath}`)

  const defaultTemplate = fs.readFileSync(defaultTemplatePath, 'utf-8')
  // console.log(`Default template content is:\n\n${defaultTemplate}\n\n`)

  // Set up options for marked
  const markedOptions = Object.assign({
    highlight: function (code) {
      return highlight.highlightAuto(code).value
    },
    sanitize: false,
    syntax: true
  }, marked)

  // Build index.html files for each path
  pages.forEach(page => {
    console.log(`\nPage "${page.title}":`)

    // Content is specified as page.content or page.path/README.md
    const path = 'content' in page
      ? join(rootDir, page.content)
      : join(rootDir, page.path, 'README.md')
    console.log(` - path to page content is: ${path}`)

    // Read the Markdown content
    const content = fs.readFileSync(path, 'utf-8')
    // console.log(` - page content is: \n\n${path}\n\n`)

    // Convert Markdown to HTML
    const body = Marked(content, markedOptions)
    // console.log(` - rendered html is: \n\n${body}\n\n`)

    // Use custom template OR default template
    console.log(` - custom page template is: ${page.template}`)
    const pageTemplate = 'template' in page
      ? fs.readFileSync(join(rootDir, `${page.template}.${viewEngine}`))
      : defaultTemplate

    // Create the destination directory
    const outdir = join(distDir, page.path)
    console.log(` - creating output directory: ${outdir}`)
    mkdirp.sync(outdir)

    // Generate a .html page using the selected template engine
    consolidate[viewEngine].render(
      pageTemplate,
      Object.assign({}, options, locals, page, { body }),
      function (err, html) {
        if (err) {
          throw err
        }
        // console.log(` - rendered html is: \n\n${html}\n\n`)

        // Write the HTML to a file
        const outpath = join(outdir, 'index.html')
        console.log(` - writing to ${outpath}`)
        fs.writeFileSync(outpath, html)
      }
    )
  })
}

// Start up a static file server to review
function serve ({
  port = process.env.PORT || 3000,
  ip = process.env.IP || '127.0.0.1',
  dist = ''
} = {}) {
  const serve = serveStatic(join(process.cwd(), dist))
  const server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res))
  })
  server.listen(port, function () {
    console.log(`Serving ${dist} at http://${ip}:${port}.`)
  })
}

// Build if called directly with `node build.js`
if (require.main === module) {
  const config = require('./package.json')
  build(config)

  if (process.argv[2] === '--serve') {
    serve(config)
  }
}
