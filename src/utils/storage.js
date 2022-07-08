export const setItem = (key, data) => {
    if (typeof data === 'object') {
        localStorage.setItem(key, JSON.stringify(data))
    } else {
        localStorage.setItem(key, data)
    }
}

export const getItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (error) {
        return localStorage.getItem(key)
    }
}

export const removeItem = (key) => {
    localStorage.removeItem(key)
}