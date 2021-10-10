import { ReactNode } from 'react';
import { WiredIcon } from '../src/iconography';

type Reasearcher = {
    name : string,
    logo : any
}

const researchers : Reasearcher[] = [
    { name: 'The wired', logo: WiredIcon },
    { name: 'Startup Creative', logo: WiredIcon },
    { name: 'Entrepreeneur', logo: WiredIcon },
    { name: 'Indeed', logo: WiredIcon }
];

export { researchers };