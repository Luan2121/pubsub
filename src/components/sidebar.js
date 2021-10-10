/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { theme } from '../theme';
import { TwitterIcon } from '../iconography';

import Image from 'next/image';
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import MoreEllipsisV from '../iconography/more-ellipsis-v';
import { useTopics } from '../hooks/use-topics';

const Sidebar = () => {
    const { data : topics } = useTopics();
    return (
        <aside css = {css`
            width: 230px;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            background-color: ${theme.palette.secondary};
            justify-content: space-between;
            display: flex;
            flex-direction: column;
            padding: 24px;
        `} >
            <div css = {css`
                display: flex;
                justify-content: space-between;
                align-items: center;
            `}>
                <div 
                    css = {css`
                        border-radius: 16px;
                        width: 48px;
                        height: 48px;
                        background-color: ${theme.palette.white}
                    `}
                />
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div css = {css`
                                width: 16px;
                                height: 16px;
                                color: white;
                            `}>
                                <MoreEllipsisV/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Publicar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <ul css = {css`
                color: ${theme.palette.white};
                list-style: none;
                margin: 0;
                padding: 24px;
                & li {
                    margin-bottom: 32px;
                }
            `}>
                {( topics || [] ).map( (topic,index) => (
                    <li key = {`${topic}-${index}`}>
                        <Link href = {`/noticias/${topic.name.toLowerCase()}`} >
                            <a>
                                {topic.name}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <div css = {css`
                color: ${theme.palette.white};
                font-size: 14px;
            `}>
                <Image
                    alt = "profile-image" 
                    src = "/profile-img-1.jfif" 
                    width = "48px"
                    height = "48px"
                    css = {css`
                        object-fit: cover;
                        border-radius: 8px;
                    `}
                />
                <div css = {css`
                    margin-top: 8px;
                `}>
                    Angel España
                </div>
                <div>
                    <a rel = "noreferrer" href = "https://twitter.com/StrangesAxl" target = "_blank" css = {css`
                        display: flex;
                        width: 24px;
                        height: 24px;
                        color: ${theme.palette.white};
                    `}>
                        <TwitterIcon />
                        <span css = {css`
                            color: #a2a8f2;
                            margin-top: 8px;
                        `}>
                            @StrangesAxl
                        </span>
                    </a>
                </div>
            </div>
        </aside>
    );
}

export { Sidebar }