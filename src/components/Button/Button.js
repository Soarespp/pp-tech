const Button = ({ children, variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-green-900 text-white hover:bg-green-800",
    secondary: "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200",
    outline:
      "bg-white text-green-900 border-2 border-green-900 hover:bg-green-50",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg transition-colors duration-200 
                ${variants[variant]} ${props.className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
