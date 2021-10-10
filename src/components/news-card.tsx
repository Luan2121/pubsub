/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

type NewsCardProps = {
    item : any
}

const NewsCard= ({ item } : NewsCardProps ) => {
    return (
        <div
            className="keen-slider__slide"
            css = {css `
                height: 420px;
                padding: 24px;
            `}
        >   
            <div css = {css`
                width: 100%;
                height: 100%;
                background-color: #237c73;
                background-image: url(${ item?.images?.[0] });
                background-size: cover;
                background-position: center;
                display: flex;
                align-items: flex-end;
                position: relative;
            `}>
                {item?.topic && (
                    <div css = {css`
                        padding: 2px 12px;
                        background-color: white;
                        border-radius: 16px;
                        color: black;
                        position: absolute;
                        top: 12px;
                        right: 12px;
                    `}> 
                        {item.topic}
                    </div>
                )}
                <div css = {css`
                    padding: 18px;
                    color: white;
                    width: 100%;
                    position: relative;
                `}>
                    <div
                        css = {css`
                            position: absolute;
                            top: 0; left: 0; right: 0; bottom: 0;
                            width: 100%;
                            height: 100%;
                            z-index: 1;
                            background: linear-gradient(0deg, rgba(0,0,0,1) 47%, rgba(255,255,255,0) 100%);;
                            opacity: 0.2;
                        `}
                    />
                    <div css = {css`
                        position: relative;
                        z-index: 2;
                    `}>
                        <div css = {css`
                            font-size: 18px;
                            font-weight: bold;
                            margin-bottom: 4px;
                        `}>
                            {item?.title || "Desconocido"}
                        </div>
                        <div css = {css`
                            font-size: 12px;
                        `}>
                            {item?.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { NewsCard }