export const setProcessingForm = (formName, isProcessing) => {
    return {
        type: 'SET_PROCESSING_FORM',
        formName,
        isProcessing,
    };
};
export const setUserToken = (token) => {
    return {
        type: 'SET_USER_TOKEN',
        token,
    };
};
export const setFilters = (filters) => {
    return {
        type: 'SET_FILTERS',
        filters,
    }
};
export const setCurrency = (currency) => {
    localStorage.setItem('currency', currency);
    return {
        type: 'SET_CURRENCY',
        currency,
    }
};
export const setCurrencyRate = (baseRate, rates) => {
    const newRates = {
        ...(localStorage.getItem('rates') ? JSON.parse(localStorage.getItem('rates')) : {}),
        [baseRate]: rates,
    }
    localStorage.setItem('rates', JSON.stringify(newRates));
    return {
        type: 'SET_CURRENCY_RATES',
        rates: newRates
    }
}
export const getCurrencyRates = (baseRate) => {
    return (dispatch) => {
        return fetch('https://api.exchangeratesapi.io/latest?base=' + baseRate, {
            method: 'GET',
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response;
        })
        .then((response) => {
            dispatch(setCurrencyRate(baseRate, { ...response.rates, timestamp: (new Date()) }))
            return response;
        })
    }
}
export const setSelectedList = (listId) => {
    localStorage.setItem('listId', listId);
    return {
        type: 'SET_SELECTED_LIST',
        listId,
    }
} 