import StyledButton from './StyleButton';
import React from 'react';

const Button = (props) => {
    const {color, background, text, radius, width} = props
    return (
        <StyledButton color={color} background={background} radius={radius} width={width} {...props}>
            {text}
        </StyledButton>
    )
}
  
export default Button;