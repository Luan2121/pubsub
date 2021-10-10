/** @jsxRuntime classic */
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/react';

const AppGlobalStyles = () => (
    <Global 
        styles = {css`
            html, body, #__next, #__next > div, #__next > div > div {
                height: 100%;
            }

            h1 {
                margin: 0;
                padding: 0;
            }
        `}
    />
);

export { AppGlobalStyles };