import React from 'react'

function Star({ color, value, bounding }) {
    return (
        <span>
            <i style={{ color }} className={
                value >= bounding[1]
                ? 'fas fa-star'
                : value >= bounding[0]
                    ? 'fas fa-star-half-alt'
                    : 'far fa-star'
            }>
                
            </i>
        </span>
    )
}

export default Star
