
// localStorage
export function data(key: string, value?: any) {
    try {
        if (value === undefined) {
            const res = localStorage.getItem(key)
            if (!res) {
                return ""
            }
            return JSON.parse(res)
        }
        if (!value) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    } catch (error) {
        console.error("缓存设置失败", error)
    }
}

// 防抖
type CB = (...params: any[]) => any
export function debounce(fn: CB, wait: number) {
    let timeout: any = null
    return function(...params: any[]) {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn(...params)
        }, wait)
    }
}

export function trimObjectValues(obj: Object) {
    const result: { [props: string]: any } = {}

    Object.entries<any>(obj).map(entry => {
        const [key, value] = entry

        if (typeof value === "string") {
            result[key] = value.trim()
        } else {
            result[key] = value
        }
    })

    return result
}


export function sleep (ms:number) {
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, ms)
    })
}