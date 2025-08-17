import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color }) => {
  const starColor = color || '#f8e825';

  const renderStar = (index) => {
    if (value >= index) return <FaStar style={{ color: starColor }} />;
    if (value >= index - 0.5) return <FaStarHalfAlt style={{ color: starColor }} />;
    return <FaRegStar style={{ color: starColor }} />;
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{renderStar(i)}</span>
      ))}
      {text && <span className="ml-2 text-gray-600">{text}</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
