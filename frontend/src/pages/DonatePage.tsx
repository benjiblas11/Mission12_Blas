
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand.tsx';
import { useCart } from '../context/CartContext.tsx';
import { useState } from 'react';
import { CartItem } from '../types/CartItem.ts';

function DonatePage() {
  const navigate = useNavigate();
  const { title, price, bookId } = useParams();
  const { addToCart } = useCart();
  const [quantity, setTotalQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      price: Number(price),
      quantity,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <br></br>
      <h2>Buy {title}</h2>
      <br></br>
      <h3>Price: ${price}</h3>
      <div>
        <input
          type="number"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(x) => setTotalQuantity(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default DonatePage;
