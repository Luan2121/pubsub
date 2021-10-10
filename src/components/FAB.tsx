/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';

interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const FAB = ({ children, ...props} : FABProps) => {
    return (
        <div css = {css`
            position: fixed;
            z-index: 999;
            right: 48px;
            bottom: 48px;
        `}>
            <button {...props} css = {css`
                background-color: #0066fe;
                border: 0;
                color: #FFF;
                width: 72px;
                height: 72px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;

                & svg {
                    width: 24px;
                    height: 24px;
                }
            `}>
                {children}
            </button>
        </div>

    );
}

export { FAB }