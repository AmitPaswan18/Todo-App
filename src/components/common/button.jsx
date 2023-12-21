function Button(props) {
  const { size, color, children, className, ...rest } = props;
  const styles = {
    fontSize: size === "small" ? "12px" : "16px",
    padding: size === "small" ? "4px 8px" : "8px 16px",
    backgroundColor: color,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <button className={className} style={styles} {...rest}>
      {children}
    </button>
  );
}

export default Button;
