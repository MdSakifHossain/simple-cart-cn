import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/copyToClipboard";
import { formatCompactNumber } from "@/lib/formatCompactNumber";
import React from "react";

// Define the type for a single item in the cart
interface CartItem {
  id: string;
  itemName: string;
  quantity: number;
  time: number;
  formattedTime: string;
}

// Define the props for the Main component
interface MainProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Main: React.FC<MainProps> = ({ cart, setCart }) => {
  const handleItemDelete = (currentID: string) => {
    const itemToBeDeleted = cart.find((item) => item.id === currentID);
    setCart((prevCart) => prevCart.filter((item) => item.id !== currentID));
    toast.success(() => (
      <div className="font-satoshi rounded-lg flex items-start justify-between flex-col px-4">
        <h1 className="text-xl capitalize">
          Deleted{" "}
          <span className="text-red-600">{itemToBeDeleted?.itemName}</span>
        </h1>
      </div>
    ));
  };

  const handleCopy = async (value: string | number, toasterLabel: string) => {
    try {
      await copyToClipboard(String(value));
      toast.success(() => (
        <div className="font-satoshi rounded-lg flex items-start justify-between flex-col px-4">
          <h1 className="text-xl capitalize">
            <span className="text-green-600">success: </span>
            Copied {toasterLabel}
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

  const stopAndHandle = (
    event: React.MouseEvent,
    handler?: (event: React.MouseEvent) => void
  ) => {
    event.stopPropagation();
    if (handler) {
      handler(event);
    }
  };

  return (
    <section className="my-7 flex flex-col gap-4 select-none">
      <h2 className="text-4xl font-bold">Shopping Cart:</h2>

      <ul className="list bg-base-100 rounded-box shadow-md flex flex-col gap-2.5">
        {cart.length === 0 && (
          <div className="text-lg capitalize py-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <i className="text-3xl ti ti-alert-square-rounded"></i>
              no items in your cart.
            </div>
            <div className="flex items-center gap-2">
              <i className="text-3xl ti ti-square-rounded-plus"></i>
              click on the "plus" icon to add stuff in the cart
            </div>
          </div>
        )}
        {cart?.map((item) => (
          <li
            key={item.id}
            className="bg-my-dark-3 flex items-center justify-between gap-4 px-4 py-4 rounded-md"
          >
            <Drawer>
              <DrawerTrigger asChild>
                <div className="flex-1 font-medium text-2xl flex items-center gap-3">
                  <div>
                    {item.itemName.length > 10
                      ? `${item.itemName.slice(0, 10)}...`
                      : item.itemName}
                  </div>
                  <i className="ti ti-arrows-exchange"></i>
                  {formatCompactNumber(item.quantity)}
                </div>
              </DrawerTrigger>
              <DrawerContent className="font-satoshi">
                <DrawerHeader className="capitalize flex items-center">
                  <DrawerTitle className="text-2xl">Item Info</DrawerTitle>
                  <DrawerDescription>
                    Items specific information
                  </DrawerDescription>
                </DrawerHeader>
                <div className="mx-5 flex flex-col items-start justify-center gap-4">
                  <div className="flex flex-col items-start justify-center gap-1">
                    <p className="text-base flex flex-col justify-start items-start">
                      Name:
                      <span
                        onClick={() => handleCopy(item.itemName, "Name")}
                        className="font-bold text-3xl transition-all duration-150 active:underline active:underline-offset-4"
                      >
                        {item.itemName}
                      </span>
                    </p>
                    <p className="text-base flex flex-col justify-start items-start">
                      Quantity:
                      <span
                        onClick={() => handleCopy(item.quantity, "Quantity")}
                        className="font-bold text-3xl transition-all duration-150 active:underline active:underline-offset-4"
                      >
                        {item.quantity}
                      </span>
                    </p>
                    <p className="text-base flex flex-col justify-start items-start">
                      Added Time:
                      <span
                        onClick={() => handleCopy(item.formattedTime, "Time")}
                        className="font-bold text-3xl transition-all duration-150 active:underline active:underline-offset-4"
                      >
                        {item.formattedTime}
                      </span>
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-sm text-white transition-all duration-150 active:scale-90"
                    onClick={() => handleCopy(item.id, "ID")}
                  >
                    #{item.id}
                  </Badge>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button
                      variant="default"
                      className="py-7 text-xl active:scale-95"
                    >
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center outline-0 pl-2">
                <i className="ti ti-dots-vertical text-2xl text-white"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-satoshi font-medium">
                <DropdownMenuLabel
                  className="text-sm font-bold text-center"
                  onClick={(e) => stopAndHandle(e)}
                >
                  ✨ Actions ✨
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-lg"
                  onClick={(e) =>
                    stopAndHandle(e, () => handleItemDelete(item.id))
                  }
                >
                  <i className="ti ti-trash"></i>Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Main;
