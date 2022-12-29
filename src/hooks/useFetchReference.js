import { useEffect, useState } from 'react';

// Function
import { fetchData } from '../api/fetchData';

// Helpers
import { 
    findBookName, 
    findBookShortname, 
    getUrlParam, 
    removeSpecialChar, 
    redirectToReadUrl,
    getBook, 
    getChapter,
    checkBook,
    checkChapter,
    checkTranslation
} from '../helpers';


function useFetchReference() {

    // Function that fills an array of verses, 
    // where each verse is an object containing 2 properties : the verse number and the verse text.

    const [query, setQuery] = useState();
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState({});
    const [chapter, setChapter] = useState();
    const [text, setText] = useState([]);
    const [error, setError] = useState(undefined);

    const returnVersesArray = (object) => {
        let array = [];
        for (let item in object) {
            let verse = {
                verseNb: object[item].verse,
                verseText: removeSpecialChar(object[item].text)
            }
            array.push(verse);
        }
        return array;
    } 


    // In case of error, stop the function, set loading to false, and return the error

    const handleErrors = data => {
        if ((data.error === "" || typeof data.error ==='number') && data.error !== 200) {
            setError({code: data.error, description: ''});
            setLoading(false);
            if (data.jsonResponse.errors) {
                setError({code: data.error, description: data.jsonResponse.errors});
            };
        }
    }




    const fetchReference = async() => {

        // Initialize
        setLoading(true);

        // Fetch data to the API
        const result = await fetchData(query);

        handleErrors(result);
         
        // Retrieve results
        const jsonResponse = result.jsonResponse;
        let results;
        if (jsonResponse.results) {
            if (jsonResponse.results.length > 0) {
                results = jsonResponse.results[0];
            }
        } else {
            return;
        }
        
        // Check verse param
        const key = Object.keys(results['verse_index']);
        const nbVerses = results['verse_index'][key].length;
        if (Number(getUrlParam('verse')) > nbVerses) {
            redirectToReadUrl(
                query.translation,
                query.reference
            );
            return;
        }

        // Find book name and save it to a state
        // I search myself the book name in my "books" array located in the "source" folder, because for some reason the Bible SuperSearch API doesn't always return the complete book name.
        // I need also to return the book_id for the nav buttons.
        const book = {
            id: results.book_id,
            shortname: findBookShortname(results.book_id),
            name: findBookName(results.book_id)
        }
        setBook(book);

        // Find chapter number and save it to a state
        const chapter = results.verses[query.translation];
        const chapterNb = Object.keys(chapter)[0];
        setChapter(Number(chapterNb));

        // Save all chapter verses in an array and save it to a state
        const verses = chapter[chapterNb];
        const versesArray = returnVersesArray(verses);
        setText(versesArray);

        // Stop loading
        setLoading(false);
    
    }


    const checkUrl = () => {

        let valid = true;
                
        let translation = getUrlParam('translation');
        if (!checkTranslation(translation)) {
            valid = false;
            translation = 'martin';
        }
        
        let reference = getUrlParam('reference');
        let verse = getUrlParam('verse');
        let book = getBook();                    
        if (book && checkBook(book.shortname)) {
            let chapter = getChapter();
            if (chapter && !checkChapter(chapter, book.shortname)) {
                valid = false;
                reference = `${book.shortname} 1`;
                verse = null;
            }
        } else {
            valid = false;
            reference = 'Gen 1';
            verse = null;
        }

        if (!valid) {
            redirectToReadUrl(translation, reference, verse);
        }

    }




    // Fetch data at initial render and query

    useEffect(
        () => {

            if (!query) {

                checkUrl();
                
                setQuery(
                    {
                        reference: getUrlParam('reference'),
                        translation: getUrlParam('translation')
                    }
                );

            }

            else {

                fetchReference();

            }

        }, [query] /* eslint-disable-line react-hooks/exhaustive-deps */
    );

    
    return {loading, error, book, chapter, text};
    

}

export default useFetchReference;
