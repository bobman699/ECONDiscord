exports.paginateUtil2 = async function paginateUtil(data, key, amountPerPage) {
    const pages = [null,
         new Map()
    ]
    let currentPage = 1;
    await data.forEach((value) => {
        if (pages[currentPage].size === amountPerPage) {
            currentPage++
            pages[currentPage] = new Map();
        } else {
        }
        pages[currentPage].set(value[key], value)
    })

    return pages
}