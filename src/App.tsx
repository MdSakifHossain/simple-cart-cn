import Header from "@/components/Header.tsx";
import Main from "@/components/Main.tsx";
import Footer from "@/components/Footer.tsx";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const App = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Toaster position="top-center" expand={false} />
      <div className="font-satoshi bg-my-dark-1 text-my-whitish min-h-svh px-6 pb-24">
        <Header cartLength={cart.length} />
        <Main cart={cart} setCart={setCart} />
        <Footer setCart={setCart} />
      </div>
    </>
  );
};

export default App;
