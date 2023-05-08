import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  quantity: number,
  setQuantity: Dispatch<SetStateAction<number>>, 

}

const QuantityInput = ({ quantity, setQuantity }: Props) => {

  const handleChange = (e: any) => {
    const newQ = Number(e.target.value)
    setQuantity(newQ >= 0 ? newQ : 0);
  };

  function increment() {
    setQuantity(quantity => quantity + 1)
  }

  function decrement() {
    setQuantity(quantity => quantity === 0 ? 0 : quantity - 1)
  }

  return (
    <div className="flex items-center">
      <button
        className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300"
        onClick={decrement}
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="w-20 text-center border rounded border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-200  mx-2"
        style={{ WebkitAppearance: 'textfield', MozAppearance: 'textfield' }}
      />
      <button
        className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;