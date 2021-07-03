import React from 'react';
import Star from './Star';

function Rating({ value, text, color }) { //note that we access the params with curly braces
    return (
        <div className="rating">
            
            {/* Generating the reviews in star terms */}
            <Star color={color} value={value} bounding={[0.5, 1]} />
            <Star color={color} value={value} bounding={[1.5, 2]} />
            <Star color={color} value={value} bounding={[2.5, 3]} />
            <Star color={color} value={value} bounding={[3.5, 4]} />
            <Star color={color} value={value} bounding={[4.5, 5]} />

            {/* Adding the text for the stars */}
            <span>{text && text}</span>
        </div>
    )
}

export default Rating
