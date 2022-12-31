const Notification = ({ message, error=false }) => {
	if (message === null) {
		return null
	}

	return (
		<div className={error ? 'error' : 'message'}>
			{message}
		</div>
	)
}

export default Notification;