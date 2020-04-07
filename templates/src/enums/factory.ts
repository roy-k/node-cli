
export interface EnumsField {
    label: string
    value: any
    status?: any
}

class EnumsBase {
    private enumsFields: EnumsField[] = []

    constructor(enumsFields: EnumsField[]) {
        this.enumsFields = enumsFields
    }

    get enumsData(): EnumsField[] {
        return this.enumsFields
    }

    filterData(filter: (field: EnumsField) => boolean) {
        return this.enumsFields.filter(filter)
    }

    private findItem(key: any, keyProps: keyof EnumsField) {
        for (let i = 0; i < this.enumsFields.length; i++) {
            const item = this.enumsFields[i]
            if (item[keyProps] === key) {
                return item
            }
        }

        // console.error("枚举取值错误:", key)
        return null
    }

    getValue(key: string) {
        const item = this.findItem(key, 'label')
        return item && item.value
    }

    getLabel(value: any) {
        const item = this.findItem(value, 'value')
        return item && item.label
    }

    getStatus(value: any) {
        const item = this.findItem(value, 'value')
        return item && item.status
    }
}

export function createEnums (enumsFields:EnumsField[]) {
    return new EnumsBase(enumsFields)
}