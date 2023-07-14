import './styles.scss';
import React, { useEffect, useState } from 'react';
import PageHeader from './layout/PageHeader';
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';
import { api } from './provider';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  const [cart, setCart] = useState([]);

  const productObject = {
    name: 'produto',
    category: 'categoria',
    price: randomNumber(90, 1200),
    quantity: 1
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      await api.post('/cart', productObject);
      fetchData();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleRemoveItem = async (_id) => {
    try {
      await api.delete(`/cart/${_id}`);
      fetchData();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleUpdateItem = async (item, action) => {
    try {
      let newQuantity = item.quantity;

      if (action === 'decrease') {
        if (newQuantity === 1) {
          return;
        }
        newQuantity -= 1;
      }
      if (action === 'increase') {
        newQuantity += 1;
      }
      const newData = { ...item, quantity: newQuantity };
      delete newData._id;
      await api.put(`/cart/${item._id}`, newData);
      fetchData();
    } catch (error) {
      console.error('Error updating item in cart:', error);
    }
  };

  const getTotal = () => {
    let sum = 0;

    for (let item of cart) {
      sum += item.price * item.quantity;
    }

    return sum;
  };

  const cartTotal = getTotal();

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={'Seu carrinho'} />
        <div className='content'>
          <section>
            <button onClick={handleAddItem} className='add-btn'>
              Add to cart
            </button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <TableRow
                    key={item._id}
                    data={item}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                  />
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>
                      <b>Carrinho de compras vazio.</b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary total={cartTotal} />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
