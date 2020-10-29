import fs from 'fs-extra'

const getIndexFileStr = (name: string) => `/**
 * 
 */

export function ${name}(): any {
  
     
}`

const getTestFileStr = (name: string) => `import { ${name} } from './'

/**
 * 
 */
describe('', () => {

    test('', () => {

    })

})`

export async function addAlgorithm(targetPath: string, name: string) {
    const indexStr = getIndexFileStr(name)
    const testStr = getTestFileStr(name)

    await fs.mkdir(targetPath)
    await fs.writeFile(`${targetPath}/index.ts`, indexStr)
    await fs.writeFile(`${targetPath}/${name}.test.ts`, testStr)
}
