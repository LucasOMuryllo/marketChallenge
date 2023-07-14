import { useState } from 'react';

function Modal() {
    const [inputValue, setInputValue] = useState('');
    const [cupom, setCupom] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCancel = () => {
        // Lógica para cancelar
    };

    const handleConfirm = () => {
        // Lógica para confirmar
        setCupom(true);
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h2>Cupom de Desconto</h2>
                <input
                    className='input-container'
                    placeholder='Adicione aqui seu cupom de desconto...'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <div className="button-container">
                    <button className="cancel-button" onClick={handleCancel}>
                        CANCELAR
                    </button>
                    <button className="confirm-button" onClick={handleConfirm}>
                        CONFIRMAR
                    </button>
                </div>
                {cupom && <p>Cupom aplicado com sucesso!</p>}
            </div>
        </div>
    );
}

export default Modal;
