import axios from 'axios';

export const FETCH_ITEMS='FETCH_ITEMS';
export const FETCH_FILTERS='FETCH_FILTERS';
export const FILTER_ITEM='FILTER_ITEM';

export function fetchItems(filters = null) {
    const url = '/src/api/products.json';
    if (filters)
        return {
            type: FILTER_ITEM,
            filters: filters
        }
    const request =  axios.get(url);
    return {
        type: FETCH_ITEMS,
        payload: request
    }
}

export function fetchFilters() {
    const url = '/src/api/filter.json';
    const request = axios.get(url);
    return {
        type: FETCH_FILTERS,
        payload: request
    }
}
