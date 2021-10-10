/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label ?: string,
    secondaryLabel ?: string
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

            & .secondary-label {
                font-size: 12px;
                margin-top: 4px;
            }
        `}>
            <label>
                {props.label}
            </label>
            {props.secondaryLabel && (
                <div className = "secondary-label">
                    {props.secondaryLabel}
                </div>
            )}
            <input ref = {ref} {...props} />
        </div>
    );
})

export { TextField };