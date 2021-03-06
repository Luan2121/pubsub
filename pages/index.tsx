/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import type { NextPage } from 'next';
import { Fragment, useState } from 'react';
import { useKeenSlider } from "keen-slider/react";
// Components 
import { Sidebar } from '../src/components/sidebar';
import { FAB } from '../src/components/FAB';
import { Dialog , DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '../src/components/dialog';
import { researchers } from '../src/data';
import { theme } from '../src/theme';
import { PlusIcon } from '../src/iconography';
import { useMutateTopic } from '../src/hooks/use-topics';
import { useReceiveNews } from '../src/hooks/use-receive-news';
import { NewsCard } from '../src/components/news-card';
const Home: NextPage = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({ slidesPerView: 2 });
  const { mutate : createTopic, isLoading } = useMutateTopic();
  const [ name , setName ] = useState("");
  const [ saveSubscription ] = useState( () => {
    if(typeof window !== 'undefined' ){
        return localStorage.getItem("subscriptionName") || "";
    }
    return "";
  });
  const [ news ] = useReceiveNews({ 
    saveSubscription
  });

  console.log({ news, saveSubscription });
  return (
    <Fragment>
      <div className = "next-container" >
        <Sidebar />
        <main css = {css`
          width: 100%;
          min-height: 100%;
          padding-left: 230px;
          padding-bottom: 48px;
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
              2020
            </span>
            <div css = {css`
              margin-left: 48px;
              color: #f1eff0;
              & span {
                font-size: 42px;
                display: block;
              }
            `}>
              <span> 
                Un a??o en revision:
              </span> 
              <span>
                Los 10 mejores albumes 
              </span>
            </div>
          </h1>
          <div css = {css`
            display: flex;
            align-item: center;
            justify-content: space-between;
            padding: 0 48px;
            color: #237c73;
          `}>
            <div css = {css`
              font-weight: bold;
            `}>
              Investigado por:
            </div>
            <div css = {css`
              display: flex;
              align-items: center;
            `}>
              <div 
                css = {css`
                  width: 80px;
                  height: 2px;
                  background-color: #237c73;
                `}
              />
            </div>
            <div css = {css`
              display: flex;
            `}>
              {researchers.map( ({ name , logo : Logo}) => (
                <div key = {name} css = {css`
                  width: 112px;
                  margin-left: 32px;
                `}>
                  <Logo />
                </div>
              ))}
            </div>
          </div>
            <div css = {css`
              display: flex;
              padding-left: 48px;
              margin-top: 72px;
              height: 100%;
            `}>
              <div css = {css`
                width: 38%;
              `}>
                <h2 css = {css`
                  color: #eef0f2;
                  font-size: 48px;
                `}>
                  Noticias y articulos
                  mas populares
                </h2>
                <p css = {css`
                  color: #237c73;
                  font-weight: bold;
                `}>
                  Reportes especiales 
                  de nuestros mejores
                  investigadores
                </p>
                <button css = {css`
                  background-color: #0066fe;
                  color: ${theme.palette.white};
                  border: 0;
                  padding: 16px 36px;
                `}>
                  VER TODOS
                </button>
              </div>
              {!!news.length && (
                 <div ref={sliderRef} className="keen-slider" css = {css`
                    width: 100%;
                  `}>
                    {news.map( (theNew,index) => (
                      <NewsCard key = {index} item = {theNew} />
                    ))}
                  </div>
              )}
            </div>
            <Dialog>
                <DialogTrigger asChild>
                  <FAB>
                    <PlusIcon />
                  </FAB>
                </DialogTrigger>
                <DialogContent css = {css`
                  min-width: 420px;
                `}>
                    <DialogTitle>
                      Nuevo Tema
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                    <div>
                      <div css = {css`
                        label {
                          display: block;
                        }

                        input { 
                          margin-top: 10px;
                          padding: 12px 24px;
                          width: 100%;
                        }
                      `}>
                        <label>
                          Nombre del tema
                        </label>
                        <input value = {name} onChange = {e => { setName(e.target.value) }} />
                      </div>
                    </div>
                    <button onClick = {() => {
                      createTopic({ name });
                    }} css = {css`
                      background-color: #0066fe;
                      color: ${theme.palette.white};
                      border: 0;
                      padding: 16px 36px;
                      margin-top: 12px;
                      cursor: pointer;

                      &:disabled {
                        opacity: 0.65;
                      }
                    `}>
                      { isLoading ? 'Creando...' : 'Crear' }
                    </button>
                </DialogContent>
            </Dialog>

          
        </main>
      </div>
    </Fragment>
  )
}

export default Home;
