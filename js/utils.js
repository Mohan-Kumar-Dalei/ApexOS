// js/utils.js

/**
 * Generates a unique ID.
 * @returns {string} A unique ID string.
 */
function generateUniqueId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Saves data to localStorage.
 * @param {string} key - The key for localStorage.
 * @param {any} data - The data to save.
 */
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("Error saving to localStorage:", e);
    }
}

/**
 * Loads data from localStorage.
 * @param {string} key - The key for localStorage.
 * @param {any} defaultValue - The default value if data is not found or parsing fails.
 * @returns {any} The loaded data or default value.
 */
function loadFromLocalStorage(key, defaultValue) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error("Error loading from localStorage:", e);
        return defaultValue;
    }
}

// Make them globally accessible if needed for HTML inline calls, or better, use module pattern
window.generateUniqueId = generateUniqueId;
window.saveToLocalStorage = saveToLocalStorage;
window.loadFromLocalStorage = loadFromLocalStorage;