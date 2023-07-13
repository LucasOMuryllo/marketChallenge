/*
? DESAFIO - Shopping Cart:

Você deve desenvolver um carrinho de compras funcional.
Funcionalidades que esperamos que você desenvolva:

x - fazer um placeholder para quando não houver itens no carrinho
x - inserção de novos produtos no carrinho
x - remoção de produtos já inseridos
x - alteração de quantidade de cada item 
x - cálculo do preço total dos itens inseridos

todo - FUNCIONALIDADE EXTRA: aplicação de cupom de desconto
*/
import './styles.scss';
import React, { useEffect } from 'react';
import PageHeader from './layout/PageHeader';
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';
import { useState } from 'react';
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
  }

  const fetchData = () => {
    api.get('/cart').then((response) => setCart(response.data));
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleAddItem = () => {
    //create

    api.post('/cart', productObject).then((response) => {
      fetchData();
    });
  }

  const handleRemoveItem = (item) => {
    //Remove
    api.delete(`/cart/${item_id}`).then(response => {
      fetchData();
    });
  }

  const handleUpdateItem = () => {
    //edit

    let newQuantity = item.quantity

    if (action === 'decrease') {
      if (newQuantity === 1) {
        return
      }
      newQuantity -= 1;

    }
    if (action === 'increase') {
      newQuantity += 1;
    }
    const newData = { ...item, quantity: newQuantity }
    delete newData._id;
    api.put(`/cart/${item._id}`, newData).then((response) => {
      fetchData();
    })
  }

  const getTotal = () => {
    let sum = 0;

    for (let item of cart) {
      sum += item.price * item.quantity
    }

    return sum
  }
  const cartTotal = getTotal()


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
                  <TableRow key={item._id}
                    data={item}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem} />))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>
                      <b>
                        Carrinho de compras vazio.
                      </b>
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
