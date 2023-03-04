const Notification = ({ message, error = false }) => {
	return <div className={error ? 'error' : 'message'}>{message}</div>;
};

export default Notification;
