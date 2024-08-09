import {
    faUtensils,
    faTv,
    faTshirt,
    faPumpSoap,
    faCouch,
    faGamepad,
    faHamburger,
    faPills,
    faBus,
    faBook,
    faPalette,
    faQuestion,
    IconDefinition
  } from '@fortawesome/free-solid-svg-icons'
  
  export const ICONS_MAP = {
    Spożywcze: 'faUtensils',
    Elektronika: 'faTv',
    Odzież: 'faTshirt',
    Kosmetyki: 'faPumpSoap',
    Dom: 'faCouch',
    Rozrywka: 'faGamepad',
    Jedzenie: 'faHamburger',
    'Zdrowie i leki': 'faPills',
    Transport: 'faBus',
    Edukacja: 'faBook',
    Hobby: 'faPalette',
    Inne: 'faQuestion',
  } as const;
  
  export type CategoryName = keyof typeof ICONS_MAP;
  export type IconName = typeof ICONS_MAP[CategoryName];
  
  export const ICONS: { [K in IconName]: IconDefinition } = {
    faUtensils,
    faTv,
    faTshirt,
    faPumpSoap,
    faCouch,
    faGamepad,
    faHamburger,
    faPills,
    faBus,
    faBook,
    faPalette,
    faQuestion,
  }
  
  export interface Category {
    id: string;
    name: string;
    icon: IconName;
    color: string;
    isBase?: boolean;
    userId?: string | null;
  }
  
  export const COLORS_MAP = {
    Red: '#FF0000',
    Blue: '#0000FF',
    Green: '#00FF00',
    Yellow: '#FFFF00',
    Pink: '#FFC0CB',
    Orange: '#FFA500',
    Purple: '#800080',
    Teal: '#008080',
    LightBlue: '#ADD8E6',
    Lime: '#00FF00',
    Brown: '#A52A2A',
    DarkRed: '#8B0000',
  } as const;
  
  export type ColorName = keyof typeof COLORS_MAP;