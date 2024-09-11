import fs from 'node:fs'

function getDirectories(path: string) {
  return fs.readdirSync(path).filter((file) => {
    return fs.statSync(`${path}/${file}`).isDirectory()
  })
}

export function getPatternRoutes() {
  const folder = getDirectories('src/patterns')

  const routes = folder.map((v) => {
    return {
      src: `src/patterns/${v}/pages`,
      path: `patterns/${v}/`,
    }
  })

  return routes
}
