import { useState, useEffect } from "react";

// API
import { fetchData } from "../api/fetchData";

// Helpers
import { removeSpecialChar, capitalizeFirstLetter, findBookName, getUrlParam } from "../helpers";


export default function useFetchVerses() {

  // States
  const [query, setQuery] = useState('');
  const [state, setState] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  // If an error is returned by the Bible SuperSearch API: save the error code and error description to the error state object, stop the loading and return
  const handleErrors = data => {
    if ((data.error === "" || typeof data.error ==='number') && data.error !== 200){
      setError({code: data.error, description: ''});
      setLoading(false);
      if (data.jsonResponse.errors) {
        setError({code: data.error, description: data.jsonResponse.errors})
      };
    }
  }


  // Find the verse text in the json file and return a verse object
  const newVerse = element => {
    const translation = query.translation;
    const chapterNb = Object.keys(element.verse_index).toString();
    const verseNb = element.verse_index[chapterNb].toString();
    const verseText = element.verses[translation][chapterNb][verseNb].text;
    const verse = {
      book: { id: element.book_id, name: findBookName(element.book_id) },
      ref: { chapterNb: chapterNb, verseNb: verseNb },
      text: capitalizeFirstLetter(removeSpecialChar(verseText))
    }
    return verse;
  }


  // Query and save results to the state
  const queryData = async(query, totalPages, firstBatch) => {

    let list = [];

    for (let page=totalPages; page>=2; page--) {
      const result = await fetchData(query, page);
      
      handleErrors(result);
      if (error) {
        break;
      }

      if (result.jsonResponse.results) {
        const results = result.jsonResponse.results;
        for (let i=results.length-1; i>=0; i--) {
          const verse = newVerse(results[i]);
          list.push(verse);
        }
      }

      setState(list);
    }

    if (error) {
      return;
    }

    const firstPageResults = firstBatch.jsonResponse.results;
    for (let i=firstPageResults.length-1; i>=0; i--) {
      const verse = newVerse(firstPageResults[i]);
      list.push(verse);
    }

    setState(list);

    if (state.length === total) {
      setLoading(false);
    }
  }




  // Fetch Data: initial render and query

  useEffect(
    
    () => {
      const addVerse = async(query) => {
        let firstBatch = await fetchData(query, 1);
        handleErrors(firstBatch);
        if (error) {
          return;
        }
        if (firstBatch.jsonResponse.paging) {
          setTotal(firstBatch.jsonResponse.paging.total);
          await queryData(query, firstBatch.jsonResponse.paging.last_page, firstBatch);
        }
        setLoading(false);
      };

    // Call the function on initial and query
      if (query) {

        addVerse(query);

      } else {

        setQuery(
          {
            value: getUrlParam('value'), 
            reference: getUrlParam('reference'),
            translation: getUrlParam('translation')
          }
        );

      }
    }, [query] /* eslint-disable-line react-hooks/exhaustive-deps */
  
  );

  return {state, total, loading, error};

}