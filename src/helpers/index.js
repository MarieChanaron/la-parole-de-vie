// Data
import { books } from "../data/books";
import { translations } from "../data/translations";



// String functions

export const removeSpecialChar = text => {
    const char = '\u00b6';
    return text.replace(char, '');
}

export const capitalizeFirstLetter = string => {
    string = string.trimStart();
    return string.charAt(0).toUpperCase() + string.substring(1);
}

// Highlight some words in a text
export function cutString(string) {

    const separators = ['.',',',';',':','!','?',' '];
    const specialMarks = ['!','?',';',':'];
    const points = ['.','!','?'];
    
    let array = [];
    let word = '';

    // I iterate through the string to find special characters (special characters are those that are not in the array above).
    // When a special character is found, I push the characters in the array and start a new array item.
  
    for (let i=0; i<string.length; i++) {

      let char;
      if (points.includes(string[i-2])) {
        char = string[i].toUpperCase();
      } else {
        char = specialMarks.includes(string[i]) ? `\u2009${string[i]}` : string[i] // Add a small non-breaking space before the character
      }
      
      if (separators.includes(string[i])) { 
        if (word.length > 0) {
          array.push(word)
        }
        if (!(char === ' ' && specialMarks.includes(string[i+1]))) {
          array.push(char);
        }
        word = '';
      } else {
        word = word + char;
      }
    
    }

  return array;
}


// DOM manipulations

export const scrollToTop = (type) => {
  const grid = document.getElementById('grid');
  if (grid) {
    grid.scrollIntoView({behavior: type, block: 'start', inline: 'nearest'});
  }
}

export const scrollToBottom = (type) => {
  const grid = document.getElementById('grid');
  grid.scrollIntoView({behavior: type, block: 'end', inline: 'nearest'});
}

export const disableScroll = () => {
  const leftScroll = window.scrollX || document.documentElement.scrollLeft;
  const topScroll = window.scrollY || document.documentElement.scrollTop;
  window.onscroll = () => {
    window.scrollTo(leftScroll, topScroll);
  }
}

export const enableScroll = () => {
  window.onscroll = () => {}
}


// Find book info in the source file

export const findBookName = bookId => {
  const l = books.length;
  for (let i=0; i<l; i++) {
    if (bookId === books[i].book_id) {
      return books[i].name;
    }
  }
}

export const findBookId = bookShortname => {
  const l = books.length;
  for (let i=0; i<l; i++) {
    if (bookShortname === books[i].shortname) {
      return books[i].book_id;
    }
  }
}

export const findNbOfChapters = bookId => {
  const l = books.length;
  for (let i=0; i<l; i++) {
    if (bookId === books[i].book_id) {
      return books[i].nb_chapters;
    }
  }
}

export const findBookShortname = bookId => {
  const l = books.length;
  for (let i=0; i<l; i++) {
    if (bookId === books[i].book_id) {
      return books[i].shortname;
    }
  }
}


// Redirect the browser to the URL

export const redirectToReadUrl = (translation, reference, verse) => {
  const currentUrl = new URL(window.location.href);
  const url = new URL('read', currentUrl.origin);
  url.searchParams.append('translation', translation);
  url.searchParams.append('reference', reference);
  if (verse) {url.searchParams.append('verse', verse);}
  window.location.href = url;
}

export const redirectToSearchUrl = (translation, reference, value) => {
  const currentUrl = new URL(window.location.href);
  const url = new URL('search', currentUrl.origin);
  url.searchParams.append('translation', translation);
  if (reference) {url.searchParams.append('reference', reference);}
  url.searchParams.append('value', value);
  window.location.href = url;
}

// Get parameters from the URL

export const getUrlParam = (param) => {
  const currentUrl = new URL(window.location.href);
  const value = currentUrl.searchParams.get(param);
  return value;
}

export const getBook = () => {
  const referenceParam = getUrlParam('reference');
  if (!referenceParam) {
    return null;
  }
  const array = referenceParam.split(' ');
  const shortname = array[0];
  const id = findBookId(shortname);
  const name = findBookName(id);
  const book = {id, shortname, name};
  return book;
}

export const getChapter = () => {
  const referenceParam = getUrlParam('reference');
  if (!referenceParam) {
    return null;
  }
  const array = referenceParam.split(' ');
  const chapter = array[1] ? array[1] : null;
  return chapter;
}


// Data validation

export const checkChapter = (value, bookShortname) => { // Check if the verse is a positive integer and if the chapter exists in the book */
  const number = Number(value);
  if (
    number && 
    Math.floor(number) === number && 
    number > 0 && 
    number <= findNbOfChapters(findBookId(bookShortname))
  ) {
    return true;
  } else {
    return false;
  }
}

export const checkVerse = value => { // Check only if the verse is a positive integer */
  const number = Number(value);
  if (
    number && 
    Math.floor(number) === number && 
    number > 0
  ) {
    return true;
  } else {
    return false;
  }
}

export const checkBook = value => {
  for (let i = 0; i < books.length; i++) {
    if (books[i].shortname === value) {
      return true;
    }
  }
  return false;
} 

export const checkTranslation = value => {
  for (let i = 0; i < translations.length; i++) {
    if (translations[i].value === value) {
      return true;
    }
  }
  return false;
}


export const deviceOrientation = () => {
  if (window.screen.availHeight < window.screen.availWidth) {
    return "landscape";
  } else {
    return "portrait";
  }
}