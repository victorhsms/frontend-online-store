export async function getCategories() {
  const fetchUrl = 'https://api.mercadolibre.com/sites/MLB/categories';
  const requestApi = await fetch(fetchUrl);
  const response = await requestApi.json();

  return response;
}

export async function getProductsFromCategoryId(categoryId) {
  const fetchUrl = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=`;
  // const fetchUrl = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const requestAPi = await fetch(fetchUrl);
  const response = await requestAPi.json();
  return response;
}

export async function getProductsFromQuery(query) {
  const fetchUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const requestAPi = await fetch(fetchUrl);
  const response = await requestAPi.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const fetchUrl = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const requestAPi = await fetch(fetchUrl);
  const response = await requestAPi.json();
  return response;
}

export async function getProductsFromProductId(productId) {
  const fetchUrl = `https://api.mercadolibre.com/items/${productId}`;
  const requestAPi = await fetch(fetchUrl);
  const response = await requestAPi.json();

  return response;
}
