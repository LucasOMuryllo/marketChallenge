import axios from "axios";

export const api = axios.create({
  baseURL: 'https://crudcrud.com/api/8b0621fead7441af86e573b8a666b27d/',
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

// export const removeItemFromCart = async (_id) => {
//   try {
//     const response = await api.delete(`cart/${_id}`);
//     return response.data;
//   } catch (error) {
//     console.log('Error removing item from cart:', error);
//     throw error;
//   }
// };

export const updateItemInCart = async (itemId, updatedData) => {
  try {
    const response = await api.put(`/cart/${itemId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating item in cart:', error);
    throw error;
  }
};
