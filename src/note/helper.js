/**
 * The function calculates from which record the next page of the list will start.
 * @constructor
 * @param {number} skipPage Page number.
 * @param {number} limitPage Number of posts per page.
 * @returns {number}
 */
export function calcPagination(skipPage, limitPage) {
  if (skipPage && limitPage) {
    return (skipPage - 1) * limitPage;
  }
}

/**
 * Function concatenates objects.
 * @constructor
 * @param {Number} userId User id.
 * @param {Boolean} complited Whether the task is completed.
 * @returns {Object}
 */
export function objectFilter(userId, complited) {
  const objFilter = {};
  objFilter.user = userId;
  if (complited) {
    objFilter.completed = complited;
  }
  return objFilter;
}
