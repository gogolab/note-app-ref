const filters = {
    searchText: "",
    sortBy: "byEdited"
};

const getFilters = () => filters;

const setFilters = updates => {
    console.log("updates:", updates);

    if (typeof updates.searchText === "string") {
        filters.searchText = updates.searchText;
    }

    if (typeof updates.sortBy === "string") {
        filters.sortBy = updates.sortBy;
    }
};

export { getFilters, setFilters };
