import React, { useState } from 'react';
import Modal from './Modal';

const Summary = ({ total }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className='box'>
        <header>Resumo da compra</header>
        <div className='info'>
          <div>
            <span>Sub-total</span>
            <span>R$ {total}</span>
          </div>
          <div>
            <span>Frete</span>
            <span>Gratuito</span>
          </div>
          <div>
            <button onClick={handleOpenModal}>
              Adicionar cupom de desconto
              <i className='bx bx-right-arrow-alt'></i>
            </button>
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>R$ {total}</span>
        </footer>
      </div>
      <button>Finalizar Compra</button>

      {isModalOpen && <Modal />}
    </>
  );
};

export default Summary;
