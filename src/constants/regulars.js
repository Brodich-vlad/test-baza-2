  // регуярниі вирази блокують російські літери. 

export const patternName = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,50}[\p{L}])?$/ugi;

export const patternEmail = /^[A-Z0-9._%+-]{2,}@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const patternEmailNonRu = /^[A-Z0-9._%+-]{2,}@[A-Z0-9.-]+\.(?!ru$|by$)[A-Z]{2,}$/i;

 // Регулярка символів телефону
export const regInputPhone = /^[+1-9 ]\d{0,}$|^$/;

export const patternPhone = /^\+380[\s]?\d{2}[\s]?\d{3}[\s]?\d{2}[\s]?\d{2}$/;

export const patternMessage = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}\d\s.,!?'-\[\]{}()_~₴#$%^&|”’`\\]{10,300}$/ugi;

export const patternUrlLinkedin = /^https:\/\/www\.linkedin\.com\/in\/[A-z0-9%/._-]{2,}/i;

export const patternNikDiscord = /^[A-z][a-zA-Z0-9-_.]{1,31}$/i;

export const patternText = /^(?!.*\s{2,}|.*[.-]{2,})(?!.*[ЁёЫыЭэЪъ])[A-Za-zА-Яа-яІіЇїЄєҐґąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s`’'-]+$/

// const emailPattern =
//   /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

// const nonRussianLettersPattern =
//   /^(?!.*\s{2,}|.*[.-]{2,})(?!.*[ЁёЫыЭэЪъ])[A-Za-zА-Яа-яІіЇїЄєҐґąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s`’'-]+$/;

// const nonRussianLettersWithSymbolsAndDigitsPattern =
//   /^(?!.*[ЁёЫыЭэЪъ])[\w\s`’'!"#$№%&()*+,\-–—./:;<=>?@[\\\]^_`{|}~A-Za-zА-Яа-яІіЇїЄєҐґąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+$/;

