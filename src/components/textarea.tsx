/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label ?: string
}

const TextArea = forwardRef( (props : TextAreaProps ,ref : ForwardedRef<HTMLTextAreaElement> ) => {
    return (
        <div css = {css`
            label {
                display: block;
                margin-bottom: 8px;
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
            <textarea ref = {ref} css = {css`
                width: 100%;
            `} {...props} />
        </div>
    );
})

export { TextArea };