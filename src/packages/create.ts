import path from 'path'
import fs from 'fs-extra'
import {msg} from '../util/color'
import inquirer from 'inquirer'
import {TEMPLATES_PATH} from '../configs/paths'

export async function createProject(projectName?: string) {
    const cwdPath = process.cwd()
    // 无参数时, 判断文件夹是否为空, 空则取文件夹名字作为项目名
    if (!projectName) {
        msg.info('未输入项目名, 尝试在当前目录创建项目')

        const hasFiles = fs.readdirSync(cwdPath).length > 0

        if (hasFiles) {
            msg.error('执行中止, 当前目录中包含文件')
            return
        }

        await solveDirPath(cwdPath)
    } else {
        const targetDirPath = path.join(cwdPath, projectName)

        try {
            await fs.access(targetDirPath)

            msg.error('同名目录已存在')
        } catch (error) {
            // 创建文件夹
            solveDirPath(targetDirPath, false)
        }
    }
}

/** 开始执行模板相关逻辑 */
async function solveDirPath(targetDirPath: string, dirExist = true) {
    // 1. 选择模板
    const tplList = await getTemplates(TEMPLATES_PATH)
    const {template} = await choseTemplate(tplList)

    console.log(template)
    const srcPath = path.resolve(TEMPLATES_PATH, template)

    // 2. 拷贝
    try {
        if (!dirExist) {
            await fs.mkdir(targetDirPath)
        }
        await fs.copy(srcPath, targetDirPath)
    } catch (error) {
        console.log(error)
    }
}

async function getTemplates(targetPath: string) {
    return fs.readdir(targetPath)
}

async function choseTemplate(tplList: string[]) {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: '请选择项目类型',
            choices: tplList,
        },
    ])
}
