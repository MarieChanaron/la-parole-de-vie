const API_URL = 'https://api.biblesupersearch.com/api';
const whole_words = true;
const page_limit = 400;


export default function setEndpoint(query, page=1) {
    const {value, reference, translation} = query;
    let endpoint = new URL(API_URL);
    endpoint.searchParams.append('bible', translation);
    if (value) {
        endpoint.searchParams.append('whole_words', whole_words);
        endpoint.searchParams.append('search', value);
        endpoint.searchParams.append('page_limit', page_limit);
        endpoint.searchParams.append('page', page);
    }
    if (reference !== 'all') {
        endpoint.searchParams.append('reference', reference);
    }
    return endpoint;
}