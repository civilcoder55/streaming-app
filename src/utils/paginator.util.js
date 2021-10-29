module.exports = async function ({ model, limit, page, filter }) {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 6;
    const count = await model.count({
        where: filter,
    });
    const pages = Math.ceil(count / limit);
    const hasOther = pages > 1 ? true : false;
    const hasNext = page < pages && hasOther ? true : false;
    const hasPerv = page > 1 && hasOther ? true : false;
    if (page > pages) {
        page = pages;
    }
    const offset = (page - 1) * limit;
    const records = await model.findAll({
        subQuery: false,
        where: filter,
        limit: limit,
        offset: offset == 0 ? null : offset,
        order: [["id", "DESC"]],
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