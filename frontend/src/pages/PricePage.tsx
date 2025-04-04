
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand.tsx';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function PricePage() {
  const navigate = useNavigate();
  const { title, bookId } = useParams();
  const { addToCart } = useCart();
  const [price, setPrice] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Project Found',
      price,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Donate to {title}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(x) => setPrice(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default PricePage;
