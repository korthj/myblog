import axios from 'axios';

export const SERACH_BAR = 'SEARCH_BAR';

const SEARCH_BAR_ROOT_URL = 'https://www.googleapis.com/customsearch/v1';
const SEARCH_BAR_API_KEY = '?key=AIzaSyAjcAYdSlGBXaiUW8ElXpplQ0AURR6M2fs';
const SEARCH_BAR_API_ID = '&cx=011239169375604198601:rubxvslj5aw&q=';

export function searchBlog(term) {
    const request = axios.get(`${SEARCH_BAR_ROOT_URL}${SEARCH_BAR_API_KEY}${SEARCH_BAR_API_ID}${term}`);
    
    return {
        type: SERACH_BAR,
        payload: request
    }
}

