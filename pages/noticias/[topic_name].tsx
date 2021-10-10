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
import { EmptySpace } from '../../src/components/empty-space';
import { useReceiveNews } from '../../src/hooks/use-receive-news';
import toast from 'react-hot-toast';
import { NewsCard } from '../../src/components/news-card';

const NewsTopic : NextPage = () => {
    const router = useRouter();
    const { topic_name } = router.query;
    const publishForm = useForm();
    const subscriptionForm = useForm();
    const [ images, setImages ] = useState<string[]>([]);
    const [ publishFormOpen, setPublishFormOpen ] = useState(false);
    const [ saveSubscription ] = useState( () => {
        if(typeof window !== 'undefined' ){
            return localStorage.getItem("subscriptionName");
        }
        return "";
    });
    const [ news ] = useReceiveNews({ 
        saveSubscription: saveSubscription || "" , 
        topicName: topic_name as string 
    });
    const { mutateAsync : publishNew } = usePublish();
    const { mutate : subscribeToTopic } = useSubscription();
    const { mutate : uploadPhoto, data } = useUploadPhoto();
    const [sliderRef] = useKeenSlider<HTMLDivElement>({ slidesPerView: 3 });
   
    useEffect( () => {
        if(data && data?.url ){
            setImages( old => [...old,data.url] );
        }
    } , [data]);

    console.log({news});

    const onSubmitNew = publishForm.handleSubmit( data => {
        publishNew({
            title: data.title as string,
            description: data.description as string,
            topic: toCammelCase(topic_name as string),
            images
        }).then( () => {
            toast.success("Noticia publicada correctamente");
            setPublishFormOpen(false);
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
            <div className = "next-container"> 
                <main css = {css`
                    width: 100%;
                    min-height: 100%;
                    padding-left: 230px;
                    display: flex;
                    flex-direction: column;
                    background-color: ${theme.palette.primary};
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
                    <EmptySpace show = {!saveSubscription} label = "Subscribete a este tema para empezar a recibir noticias">
                        <div css = {css`
                            display: flex;
                            flex-direction: column;
                            padding: 48px;
                            padding-top: 0px;
                            padding-bottom: 0px;
                        `}>
                            <div ref={sliderRef} className="keen-slider" css = {css`
                                width: 100%;
                            `}>
                                {news.reverse().filter( n => n.images?.length ).map( (theNew,index) => {
                                    return(
                                        <NewsCard item = {theNew} key = {index} />
                                    )
                                })}
                            </div>
                        </div>
                    </EmptySpace>
                    <div css = {css`
                        display: flex;
                        padding: 48px;
                    `}>
                        <div css = {css`
                            margin-right: 24px;
                        `}>
                            <Dialog open = {publishFormOpen} onOpenChange = {(open : boolean) => {
                                setPublishFormOpen(open);
                            }}> 
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
                                                secondaryLabel = {`${ saveSubscription ? "Ya tienes una subscripcion, utiliza el mismo nombre de usuario para que te lluegen las notificaciones de ambos temas" : "" }`}
                                                {...subscriptionForm.register("subscriptionName", { value: saveSubscription || "" })}
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
                </main>
            </div>
            <Sidebar />
        </Fragment>
    )
}

export default NewsTopic;