import "./alerts.css";
const Alert = ({ type, message, onClose }) => {
  let alertClass = "";
  switch (type) {
    case "success":
      alertClass = "alert-success";
      break;
    case "error":
      alertClass = "alert-error";
      break;
    case "warning":
      alertClass = "alert-warning";
      break;
    case "info":
      alertClass = "alert-info";
      break;
    default:
      alertClass = "alert-info";
  }
  return (
    <>
      <div className={`alert ${alertClass}`}>
       <div> {getIcon(type)}</div>
        <span>{message}</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </>
  );
};

const getIcon = (type) => {
  switch (type) {
    case "success":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="alert-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    case "error":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="alert-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    case "warning":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="alert-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M12 2L2 22h20L12 2z"
          />
        </svg>
      );
    case "info":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="alert-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M12 2L2 22h20L12 2z"
          />
        </svg>
      );
    default:
      return null;
  }
};
export default Alert;