import setEndpoint from './config';


export const fetchData = async(query, page) => {

    const endpoint = setEndpoint(query, page);

    try {
        const response = await fetch(endpoint);
        if (response) {
            const jsonResponse = await response.json();
            const result = {
                jsonResponse: jsonResponse,
                error: response.status
            }
            return result;
        } else {
            throw new Error("Request failed");
        }
    }
    catch(error) {
        const result = {
            jsonResponse: {
                errors: ["Le serveur ne renvoie pas de réponse... Veuillez vérifier votre connexion à internet."],
                results: []
            },
            error: ''
        };
        return result;
    }

  }