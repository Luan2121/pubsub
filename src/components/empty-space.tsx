/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Image from 'next/image';
import { ReactElement, ReactNode } from 'react';

type EmptySpaceProps = {
    show: boolean,
    children: ReactElement,
    label?: string
}

const EmptySpace = ( { show , children, label } : EmptySpaceProps ) => {

    if( show ){
        return (
            <div css = {css`
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                flex-direction: column;
            `}>
                <Image
                    src="/empty-space.png"
                    alt="EMpty Space Icon"
                    width={260}
                    height={260}
                />
                { label && (
                    <div css = {css`
                        font-size: 24px;
                        color: #237c73;
                        font-weight: bold;
                        margin-top: 16px;
                    `}>
                        {label}
                    </div>
                )}
            </div>
        )
    }

    return children;
}

export { EmptySpace };