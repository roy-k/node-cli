
import React from "react"

export interface IconProps extends React.ComponentProps<any> {
    type: string
    className?: string
}

export function Icon(props: IconProps) {
    const { type, className, ...rest } = props
    return (
        <i className={className} {...rest}>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref={`#${type}`} />
            </svg>
        </i>
    )
}