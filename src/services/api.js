export async function getCategories() {
  const fetchUrl = 'https://api.mercadolibre.com/sites/MLB/categories';
  const requestApi = await fetch(fetchUrl);
  const response = await requestApi.json();

  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let fetchUrl;
  if (!categoryId && query) {
    fetchUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  } else if (categoryId && !query) {
    fetchUrl = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } else {
    fetchUrl = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  }

  const requestAPi = await fetch(fetchUrl);
  const response = await requestAPi.json();

  return response;
}
