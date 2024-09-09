exports.paginateUtil = async function paginateUtil(data, amountPerPage) {
    const pages = {
        1: new Map()
    }
    let currentPage = 1;
    await data.forEach((value, key) => {
        if (pages[currentPage].size === amountPerPage) {
            currentPage++
            pages[currentPage] = new Map();
        } else {
        }
        pages[currentPage].set(key, value)
    })

    return pages
}