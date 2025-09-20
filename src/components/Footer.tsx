import { uid } from "uid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { formatCompactNumber } from "@/lib/formatCompactNumber";
import { formatDate } from "@/lib/formatDate";
import React from "react";

// Define the type for a single item in the cart
interface CartItem {
  id: string;
  itemName: string;
  quantity: number;
  time: number;
  formattedTime: string;
}

// Define the props for the Footer component
interface FooterProps {
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Footer: React.FC<FooterProps> = ({ setCart }) => {
  const quantityDefaultValue = 0;

  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(quantityDefaultValue);

  const addQuantity = () => setQuantity(quantity + 1);

  const removeQuantity = () => {
    if (quantity <= 1) {
      setQuantity(quantityDefaultValue);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleAddNewItem = () => {
    const dateInMS = Date.now();

    const newItem: CartItem = {
      id: uid(16),
      itemName: itemName
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      quantity,
      time: dateInMS,
      formattedTime: formatDate(dateInMS),
    };

    setCart((prev) => [...prev, newItem]);
    setQuantity(quantityDefaultValue);
    setItemName("");
    toast.success(() => (
      <div className="font-satoshi rounded-lg flex items-start justify-between flex-col px-4">
        <h1 className="text-xl capitalize">
          added <span className="text-green-600">{newItem.itemName}</span>
        </h1>
      </div>
    ));
  };

  const handleClear = () => {
    setQuantity(quantityDefaultValue);
    setItemName("");
    toast.success(() => (
      <div className="font-satoshi rounded-lg flex items-start justify-between flex-col px-4">
        <h1 className="text-xl capitalize">
          <span className="text-green-600">Cleared!!</span>
        </h1>
      </div>
    ));
  };

  return (
    <div className="fixed bottom-8 left-[50%] translate-x-[-50%]">
      <Drawer>
        <DrawerTrigger className="text-4xl bg-my-accent rounded-full p-4 text-white flex items-center justify-center outline-0 transition-all duration-150 active:scale-75">
          <i className="ti ti-plus"></i>
        </DrawerTrigger>
        <DrawerContent className="font-satoshi">
          <DrawerHeader className="capitalize relative flex items-center">
            <DrawerTitle className="text-2xl">Add new item</DrawerTitle>
            <DrawerDescription>Add as much you want!</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 flex flex-col items-center gap-6">
            <Input
              placeholder="Enter Name"
              type="text"
              className="py-6 px-4 border-2 font-medium text-lg"
              value={itemName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setItemName(e.target.value)
              }
            />

            <Input
              placeholder="Enter Amount"
              type="number"
              className="py-6 px-4 border-2 font-medium text-lg"
              value={quantity === 0 ? "" : quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                if (/^-?\d*$/.test(value)) {
                  setQuantity(Number(value));
                }
              }}
            />

            <div className="w-full flex items-center justify-around">
              <button
                onClick={removeQuantity}
                className="rounded-full bg-my-accent text-white border text-3xl p-4 flex items-center justify-center transition-all duration-75 active:scale-75 focus:ring-3 focus:ring-my-accent"
              >
                <i className="ti ti-minus"></i>
              </button>
              <p className="text-6xl font-bold">
                {formatCompactNumber(quantity)}
              </p>
              <button
                onClick={addQuantity}
                className="rounded-full bg-my-accent text-white border text-3xl p-4 flex items-center justify-center transition-all duration-75 active:scale-75 focus:ring-3 focus:ring-my-accent"
              >
                <i className="ti ti-plus"></i>
              </button>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                onClick={handleAddNewItem}
                className="py-7 text-xl active:scale-95"
                disabled={quantity === 0 || itemName.length === 0}
              >
                <i className="ti ti-plus text-2xl"></i> add new item
              </Button>
            </DrawerClose>
            <button
              onClick={handleClear}
              className={`
                rounded-full text-3xl text-my-accent absolute left-4 top-7 flex items-center transition-all duration-150 ease-out active:scale-150
                ${quantity !== 0 || itemName.length !== 0 ? `` : `hidden`}
                `}
            >
              <i className="ti ti-flame"></i>
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Footer;
