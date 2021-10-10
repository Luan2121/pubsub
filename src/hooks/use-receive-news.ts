import  { useState, useEffect } from 'react';
import io, { Socket } from'socket.io-client';
import { atom, useAtom } from 'jotai';

type UseReceiveNews = {
    saveSubscription: string,
    topicName?: string
}

const newsAtom = atom<any[]>([]);

type News = {
    title: string,
    description: string,
    images: string[],
    topic ?: string
}

const socketServerUrl = process.env.NEXT_PUBLIC_PUBSUB_SOCKET_SERVER_URL || 'http://localhost:4000/';

const useReceiveNews = ({ saveSubscription, topicName  } : UseReceiveNews ) => {
    const [ news, setNews ] = useAtom<any[], any >(newsAtom);
    const handleMessage = (data : any) => {
        console.log("New message");
        console.log({ data });
        setNews( (oldNews : any[]) => [...oldNews,data] );
    }
    useEffect( () => {
        let socket : Socket;
        if( saveSubscription ){
            socket = io( socketServerUrl , {
                withCredentials: true
            });
            socket.emit('connect-pubsub',{
                subscriptionName: saveSubscription,
                topic: topicName || "all"
            });
            socket.on('message', handleMessage );
        }
        return () => {
            if(socket){
                socket.off('message', handleMessage );
                socket.close();
            }
        }
    } , []);

    return [ news ];
}

export { useReceiveNews }