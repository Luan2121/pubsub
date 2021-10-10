/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label ?: string
}

const TextField = forwardRef( (props : TextFieldProps , ref : ForwardedRef<HTMLInputElement> ) => {
    return (
        <div css = {css`
            label {
                display: block;
            }

            input { 
                margin-top: 10px;
                padding: 12px 24px;
                width: 100%;
            }
            `}>
            <label>
                {props.label}
            </label>
            <input ref = {ref} {...props} />
        </div>
    );
})

export { TextField };