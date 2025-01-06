export const setSearchQuery = (data) => {
    const searchQuery = new URLSearchParams();
    for (const key in data) {
        if (data[key] !== -1) {
            if (Array.isArray(data[key])) {
                data[key].forEach((value) => searchQuery.append(key, value));
            } else {
                searchQuery.append(key, data[key]);
            }
        }
    }
    return searchQuery;
};
