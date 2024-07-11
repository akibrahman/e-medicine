import Cart from "@/components/Cart/Cart";

export const metadata = {
  title: "Product Details || E-Medicine",
  description: "This is product details page",
};
const layout = ({ children }) => {
  return (
    <div>
      {" "}
      <Cart />
      {children}
    </div>
  );
};

export default layout;
