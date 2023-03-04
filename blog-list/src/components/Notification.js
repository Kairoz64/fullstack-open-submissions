import { useSelector } from 'react-redux';
import './Notification.css';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    display: notification.content ? '' : 'none'
  };

  return (
    <div
      className={`notification ${notification.isError ? 'error' : 'success'}`}
      style={style}
    >
      {notification.content}
    </div>
  );
};

export default Notification;
