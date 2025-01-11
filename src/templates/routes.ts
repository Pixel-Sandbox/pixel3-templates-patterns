import fs from 'node:fs'

function getDirectories(path: string) {
  return fs.readdirSync(path).filter((file) => {
    return fs.statSync(`${path}/${file}`).isDirectory()
  })
}
function getRoutes(base: string, tribe: string) {
  const path = `${base}/${tribe}`
  const folder = fs.readdirSync(path).filter((file) => {
    return fs.statSync(`${path}/${file}`).isDirectory()
  })

  const routes = folder.map((v) => {
    return {
      src: `src/templates/${tribe}/${v}/pages`,
      path: `templates/${tribe}/${v}/`,
    }
  })

  return routes
}

export function getTemplatesRoutes() {
  const extendRoutes = getDirectories('src/templates')

  let finalRoutes: any = []
  extendRoutes.forEach((v) => {
    finalRoutes = [...finalRoutes, ...getRoutes(`src/templates/`, v)]
  })

  return finalRoutes
}
