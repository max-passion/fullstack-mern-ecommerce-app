const Message = ({ variant, children }) => {
  const baseClasses = "rounded p-4 mb-4 text-center";
  let variantClasses = "";

  switch (variant) {
    case "success":
      variantClasses = "bg-green-100 text-green-700";
      break;
    case "danger":
      variantClasses = "bg-red-100 text-red-700";
      break;
    case "warning":
      variantClasses = "bg-yellow-100 text-yellow-700";
      break;
    default:
      variantClasses = "bg-blue-100 text-blue-700";
  }

  return <div className={`${baseClasses} ${variantClasses}`}>{children}</div>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
