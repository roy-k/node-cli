#!/usr/bin/env node
import path from 'path'
import fs from 'fs-extra'
import {Command} from 'commander'
import {create} from './packages/create'
import {addSlice} from './packages/addSlice'

const program = new Command()

// version
program.version('0.1.0', '-v, --version')

//
program
    .command('init [projectName]')
    .alias('create')
    .description('创建项目')
    .action(projectName => {
        create(projectName)
    })

program
    .command('add <name>')
    .description('添加项')
    .option('-p, --page', '添加路由页面')
    .option('-c, --component', '添加公共组件')
    .option('-e, --enum', '添加枚举')
    .option('-f, --fetch', '添加接口模块')
    .option('-a, --algorithm', '添加算法')
    // .option('--entry', '添加多页面入口')
    // .option('-m, --mock', '添加接口mock模块')
    .action((name, cmdObj) => {
        return addSlice(name, cmdObj)
    })

// program
//     .command('new [module]')
//     .description('generator a new module')
//     .action(function(module){
//         gmodule(config,module)
//     });

// program
//     .command('publish')
//     .description('upload assets to CDN and git commit && push')
//     .action(function(){
//         publish(config)
//     });

// program
//     .command('analysis')
//     .description('analysis dist files size and percent')
//     .action(function () {
//         analysis(config.upload.config.srcDir);
//     });

// program
//     .command('question')
//     .description('analysis dist files size and percent')
//     .action(function(){
//         question()
//     });

program.parse(process.argv)
