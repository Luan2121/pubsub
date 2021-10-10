/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { NextPage } from "next";
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Button } from '../../src/components/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '../../src/components/dialog';
import { Sidebar } from '../../src/components/sidebar';
import { TextField } from '../../src/components/textfield';
import { TextArea } from '../../src/components/textarea';
import { theme } from '../../src/theme';
import { toCammelCase } from '../../src/utils/text';
import { useForm } from "react-hook-form";
import { usePublish } from '../../src/hooks/use-publish';
import { useUploadPhoto } from '../../src/hooks/use-upload-photo';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useSubscription } from '../../src/hooks/use-subscription';
import io, { Socket } from'socket.io-client';
import { Dropzone } from '../../src/components/dropzone';
import { useKeenSlider } from "keen-slider/react";

const handleMessage = ( setNews : Dispatch<SetStateAction<string[]>> ) => (data : any) => {
    console.log("New message");
    console.log({ data });
    setNews( oldNews => [...oldNews,data] );
}

const NewsTopic : NextPage = () => {
    const router = useRouter();
    const { topic_name } = router.query;
    const publishForm = useForm();
    const subscriptionForm = useForm();
    const [ images, setImages ] = useState<string[]>([]);
    const [ saveSubscription ] = useState( () => {
        if(typeof window !== 'undefined' ){
            return localStorage.getItem("subscriptionName");
        }
        return ""
    })
    const [ news, setNews ] = useState<any[]>([]);
    const { mutate : publishNew } = usePublish();
    const { mutate : subscribeToTopic } = useSubscription();
    const { mutate : uploadPhoto, data } = useUploadPhoto();
    const [sliderRef] = useKeenSlider<HTMLDivElement>({ slidesPerView: 3 });
   

    useEffect( () => {
        if(data && data?.url ){
            setImages( old => [...old,data.url] );
        }
    } , [data]);

    console.log({news});

    useEffect( () => {
        let socket : Socket;
        console.log({saveSubscription});
        if( saveSubscription ){
            socket = io('http://localhost:4000/', {
                withCredentials: true
            });
            socket.emit('connect-pubsub',{
                subcriptionName: saveSubscription,
                topic: topic_name
            });
            socket.on('message', handleMessage(setNews) );
        }
        return () => {
            if(socket){
                socket.off('message', handleMessage(setNews) );
                socket.close();
            }
        }
    } , []);


    const onSubmitNew = publishForm.handleSubmit( data => {
        publishNew({
            title: data.title as string,
            description: data.description as string,
            topic: toCammelCase(topic_name as string),
            images
        })
    })

    const onSubmitSubscription = subscriptionForm.handleSubmit( data => {
        subscribeToTopic({  
            topic: toCammelCase(topic_name as string) || "",
            subscriptionName: data.subscriptionName
        })
    });

    return (
        <Fragment>
            <div css = {css`
                background-color: ${theme.palette.primary};
            `}> 
                <main css = {css`
                    width: 100%;
                    height: 100%;
                    padding-left: 230px;
                    display: flex;
                    flex-direction: column;
                `}>
                    <h1 css = {css`
                        padding: 0 48px;
                        color: #262c3e;
                        display: flex;
                        align-items: center;
                    `}>
                        <span css = {css`
                        font-size: 140px;
                        letter-spacing: -0.1ch;
                        `}>
                        {toCammelCase(topic_name as string || "")}
                        </span>
                    </h1>
                    <div css = {css`
                        display: flex;
                        flex-direction: column;
                        padding: 48px;
                        padding-top: 0px;
                    `}>
                        <div ref={sliderRef} className="keen-slider" css = {css`
                            width: 100%;
                        `}>
                            {news.reverse().filter( n => n.images?.length ).map( (theNew,index) => {
                                return(
                                    <div
                                        key = {index} 
                                        className="keen-slider__slide"
                                        css = {css `
                                            height: 420px;
                                            padding: 24px;
                                        `}
                                    >   
                                        <div css = {css`
                                            width: 100%;
                                            height: 100%;
                                            background-color: red;
                                            background-image: url(${ theNew.images[0] });
                                            background-size: cover;
                                            background-position: center;
                                            display: flex;
                                            align-items: flex-end;
                                        `}>
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
                                                        {theNew.title || "I need you now tonight"}
                                                    </div>
                                                    <div css = {css`
                                                        font-size: 12px;
                                                    `}>
                                                        {theNew.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div css = {css`
                            display: flex;
                            margin-top: 48px;
                        `}>
                            <div css = {css`
                                margin-right: 24px;
                            `}>
                                <Dialog>
                                    <DialogTrigger asChild onClick = {() => {
                                        setImages([]);
                                        publishForm.reset();
                                    }}>
                                        <Button>
                                            Publicar
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle css = {css`
                                            margin-bottom: 16px;
                                        `}>
                                            Publicar noticia en { topic_name }
                                        </DialogTitle>
                                        <form onSubmit = {onSubmitNew}>
                                            <div css = {css`
                                                margin-bottom: 16px;
                                            `}>
                                                <TextField 
                                                    label = "Titulo de la noticia"
                                                    {...publishForm.register("title")}
                                                />
                                            </div>
                                            <div css = {css`
                                                margin-bottom: 16px;
                                            `}>
                                                <TextArea 
                                                    label = "Contenido de la noticia"
                                                    rows = {8}
                                                    {...publishForm.register("description")}
                                                />
                                            </div>
                                            <div>
                                                <Dropzone label = "Cubierta de la noticia" onDrop = {(newFiles) =>{
                                                    uploadPhoto({  
                                                        file: newFiles[0]
                                                    });
                                                }} />
                                            </div>
                                            <Button type = "submit">
                                                Finalizar publicacion
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            Subscribete a este tema
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle css = {css`
                                            margin-bottom: 16px;
                                        `}>
                                            Subscribirse a { topic_name }:
                                        </DialogTitle>
                                        <DialogDescription>
                                            Para subscribirte a este tema
                                            debes dejarnos tu nombre o 
                                            correo electronico
                                        </DialogDescription>
                                        <form onSubmit = {onSubmitSubscription}>
                                            <div css = {css`
                                                margin-bottom: 16px;
                                            `}>
                                                <TextField 
                                                    label = "Nombre o correo"
                                                    {...subscriptionForm.register("subscriptionName")}
                                                />
                                            </div>
                                            <Button type = "submit">
                                                Subscribirse
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Sidebar />
        </Fragment>
    )
}

export default NewsTopic;