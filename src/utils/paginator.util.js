module.exports = async function ({ model, limit, page, orderBy }) {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 6;
    
    const count = await model.count({});
    const pages = Math.ceil(count / limit);
    const hasOther = pages > 1 ? true : false;
    const hasNext = page < pages && hasOther ? true : false;
    const hasPerv = page > 1 && hasOther ? true : false;
    const offset = (page - 1) * limit;
    if (page > pages) {
        page = pages;
    }
    const records = await model.findAll({
        subQuery: false,
        limit: limit,
        offset: offset,
        order: orderBy,
    });

    return {
        records,
        page,
        pages,
        hasOther,
        hasNext,
        hasPerv,
        count,
    };
};