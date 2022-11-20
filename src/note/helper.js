export function calcPagination(skipPage, limitPage) {
  if (skipPage && limitPage) {
    return (skipPage - 1) * limitPage;
  }
}

export function objectFilter(userId, complited) {
  const objFilter = {};
  objFilter.user = userId;
  if (complited) {
    objFilter.completed = complited;
  }
  return objFilter;
}
