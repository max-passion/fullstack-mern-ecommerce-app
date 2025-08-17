import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className="my-3 p-3 rounded shadow-lg bg-white">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
      </Link>

      <div className="mt-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold hover:text-blue-600">
            {product.name}
          </h2>
        </Link>

        <div className="mt-2">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <p className="mt-2 text-xl font-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
