const ICONS_MAP = {
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

const COLORS_MAP = {
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

const BASE_CATEGORIES = [
  { name: 'Spożywcze', icon: 'faUtensils', color: 'Red' as keyof typeof COLORS_MAP },
  { name: 'Elektronika', icon: 'faTv', color: 'Blue' as keyof typeof COLORS_MAP },
  { name: 'Odzież', icon: 'faTshirt', color: 'Green' as keyof typeof COLORS_MAP },
  { name: 'Kosmetyki', icon: 'faPumpSoap', color: 'Pink' as keyof typeof COLORS_MAP },
  { name: 'Dom', icon: 'faCouch', color: 'Yellow' as keyof typeof COLORS_MAP },
  { name: 'Rozrywka', icon: 'faGamepad', color: 'Orange' as keyof typeof COLORS_MAP },
  { name: 'Jedzenie', icon: 'faHamburger', color: 'Red' as keyof typeof COLORS_MAP },
  { name: 'Zdrowie i leki', icon: 'faPills', color: 'Blue' as keyof typeof COLORS_MAP },
  { name: 'Transport', icon: 'faBus', color: 'Green' as keyof typeof COLORS_MAP },
  { name: 'Edukacja', icon: 'faBook', color: 'Pink' as keyof typeof COLORS_MAP },
  { name: 'Hobby', icon: 'faPalette', color: 'Yellow' as keyof typeof COLORS_MAP },
  { name: 'Inne', icon: 'faQuestion', color: 'Orange' as keyof typeof COLORS_MAP },
] as const;

export { ICONS_MAP, COLORS_MAP, BASE_CATEGORIES };

// tutaj były problemy przy seedowaniu bazy danych 
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ICONS_MAP, COLORS_MAP, BASE_CATEGORIES };
}
