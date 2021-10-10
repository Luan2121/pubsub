/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';
import { theme } from '../theme';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}

const Button = forwardRef( (props : ButtonProps ,ref : ForwardedRef<HTMLButtonElement> ) => {
    return (
        <div>
            <button ref = {ref} {...props} css = {css`
                background-color: #0066fe;
                color: ${theme.palette.white};
                border: 0;
                padding: 16px 36px;
                margin-top: 12px;
                cursor: pointer;

                &:disabled {
                opacity: 0.65;
                }
            `}>
                {props.children}
            </button>
        </div>
    )
})

export { Button };