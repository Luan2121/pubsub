import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const StyledOverlay = styled(DialogPrimitive.Overlay)`
    background-color: #000;
    position: fixed;
    inset: 0;
    opacity: 0.65;
`

type RootProps = {
    children: ReactNode
    [key : string]: any
}

function Root({ children, ...props } : RootProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay  />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content)`
    background-color: white;
    border-radius: 8px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw,
    max-width: 450px;
    max-height: 85vh;
    padding: 28px;
    &:focus: { outline: 'none' }
    overflow-y: scroll;
`;

const StyledTitle = styled(DialogPrimitive.Title)`
    margin: 0;
    font-weight: 500;
    font-size: 17;
`;

const StyledDescription = styled(DialogPrimitive.Description)`
    margin: 10px 0 20px;
    font-size: 15;
    line-height: 1.5;
`;

// Exports
const Dialog = Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = StyledContent;
const DialogTitle = StyledTitle;
const DialogDescription = StyledDescription;
const DialogClose = DialogPrimitive.Close;

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger };