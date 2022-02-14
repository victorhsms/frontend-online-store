export function saveCart(cartList) {
  localStorage.clear();
  const saved = JSON.stringify(cartList);
  localStorage.setItem('cartList', saved);
}

export function getCartBack() {
  const retrieve = localStorage.getItem('cartList');
  if (retrieve === null) {
    return [];
  }
  return JSON.parse(retrieve);
}
