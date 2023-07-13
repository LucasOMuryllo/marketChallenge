import axios from "axios";

export const api = axios.create({
  baseURL: 'https://crudcrud.com/api/10400b94d74545d996708e3271eff95a/',
  timeout: 10000,
});

export const fetchData = async () => {
  try {
    const response = await api.get('cart/');
    return response.data;
  } catch (error) {
    console.log('Error fetching data from API:', error);
    throw error;
  }
};

export const addItemToCart = async (productObject) => {
  try {
    const response = await api.post('cart/', productObject);
    return response.data;
  } catch (error) {
    console.log('Error adding item to cart:', error);
    throw error;
  }
};

export const removeItemFromCart = async (itemId) => {
  try {
    const response = await api.delete(`cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.log('Error removing item from cart:', error);
    throw error;
  }
};

export const updateItemInCart = async (itemId, updatedData) => {
  try {
    const response = await api.put(`/cart/${itemId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating item in cart:', error);
    throw error;
  }
};
