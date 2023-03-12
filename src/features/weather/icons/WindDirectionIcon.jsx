import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const WindDirectionIcon = ({ degree, size }) => {
  const iconStyle = {
    transform: `rotate(${degree - 45}deg)`,
  };

  return (
    <FontAwesomeIcon icon={faLocationArrow} style={iconStyle} size={size}/>
  );
};

export default WindDirectionIcon;
