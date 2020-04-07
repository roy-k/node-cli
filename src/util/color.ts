import colors from 'ansi-colors'

function error(error: string) {
    console.log(colors.redBright(error))
}

function warn(error: string) {
    console.log(colors.yellow(error))
}

function success(error: string) {
    console.log(colors.green(error))
}

function info(error: string) {
    console.log(colors.cyan(error))
}

export const msg = {
    error,
    warn,
    success,
    info,
}
