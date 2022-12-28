// Functions
import { redirectToReadUrl, getUrlParam, getBook } from ".";

// Data
import { bible } from '../data/sections';


// Event handler to set the URL parameters and redirect to new URL
const handleClick = event => {
    redirectToReadUrl(
      getUrlParam('translation'),
      event.target.getAttribute('name')
    );
}

// Add book links to the table of contents
const addBooks = (container, books) => {
    for (let i=0; i<books.length; i++) {
        const p = document.createElement('p');
        p.setAttribute('name', books[i].shortname);
        p.addEventListener('click', handleClick);
        if (books[i].book_id === getBook().id) {
            p.classList.add('selected');
        } 
        p.innerText = books[i].name;
        container.current.appendChild(p);
    }
}

const addSections = (container, sections) => {
    for (let i=0; i<sections.length; i++) {
        const section = Object.keys(sections[i]);
        const h4 = document.createElement('h4');
        h4.innerText = section;
        container.current.appendChild(h4);
        addBooks(container, sections[i][section]);
    }
}

const addTestaments = (container, testaments) => {
    const testament = Object.keys(testaments);
    const h3 = document.createElement('h3');
    h3.innerText = testament;
    container.current.appendChild(h3);
    addSections(container, testaments[testament]);
}

export const fillTableOfContents = container => {
    bible.forEach(
        testament => addTestaments(container, testament)
      ); 
}