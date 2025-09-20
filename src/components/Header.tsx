import React from "react";
import { copyToClipboard } from "@/lib/copyToClipboard";
import { formatCompactNumber } from "@/lib/formatCompactNumber";
import { toast } from "sonner";

// Define the props for the Header component
interface HeaderProps {
  cartLength: number;
}

const Header: React.FC<HeaderProps> = ({ cartLength }) => {
  const formattedCartCount = formatCompactNumber(cartLength);

  const handleCopy = async (length: number) => {
    try {
      if (length === 0) return;

      await copyToClipboard(length.toString()); // copyToClipboard likely expects a string
      toast.success(() => (
        <div className="font-satoshi rounded-lg flex items-start justify-between flex-col px-4">
          <h1 className="text-xl capitalize">
            <span className="text-green-600">success: </span>
            Copied {formattedCartCount}
          </h1>
        </div>
      ));
    } catch (error) {
      toast.warning(() => (
        <div className="font-satoshi rounded-lg flex items-start justify-between flex-col px-4">
          <h1 className="text-xl capitalize">
            <span className="text-red-600">Error:</span> cannot copy!!!
          </h1>
        </div>
      ));
    }
  };

  return (
    <div className="flex items-center justify-between py-4 select-none">
      <h1 className="text-3xl">Picart</h1>
      <div
        onClick={() => handleCopy(cartLength)}
        className="rounded-full bg-my-accent text-white px-4 py-1 border border-my-accent text-lg font-medium flex items-center justify-center gap-3
                  transition-all duration-75 active:scale-90"
      >
        <i className="ti ti-shopping-cart"></i>
        <span>{formattedCartCount}</span>
      </div>
    </div>
  );
};

export default Header;
