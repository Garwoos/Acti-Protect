import React, { useState } from 'react';
import './paiement.css';
import NavBar from './navBar';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('Card');

  const paymentMethods = ['Card', 'Divido', 'Cash App Pay', 'Afterpay'];

  return (
    <div className="payment-page">
      <div className="payment-navbar">
        <NavBar />
      </div>  
      <div className="payment-form">
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <div
              key={method}
              className={`payment-method ${
                selectedMethod === method ? 'active' : ''
              }`}
              onClick={() => setSelectedMethod(method)}
            >
              {method}
            </div>
          ))}
        </div>

        <div className="form-content">
          {selectedMethod === 'Card' && (
            <>
              <div className="form-group">
                <label>Card number</label>
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="input-field"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiration</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" placeholder="CVC" className="input-field" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Country</label>
                  <select className="input-field">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>ZIP</label>
                  <input type="text" placeholder="12345" className="input-field" />
                </div>
              </div>
              <button className="pay-button">Pay now</button>
            </>
          )}
          {/* Ajoutez des formulaires personnalisés ici pour d'autres méthodes de paiement */}
        </div>
      </div>
    </div>
  );
};

export default Payment;
