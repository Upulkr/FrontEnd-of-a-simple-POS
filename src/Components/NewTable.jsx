import React from "react";
import { useParams } from "react-router-dom";
export default function NewTable(props) {
  const params = useParams();

  let totalSum = 0;
  props.products.forEach((item) => {
    totalSum += item.quantity * item.retailPrice;
  });

  return (
    <div className='relative translate-y-8 overflow-x-auto'>
      <table
        border={2}
        className='w-full'
      >
        <tbody>
          <tr>
            <th scope='col' className='text-center   font-semibold'>
              Product Name
            </th>
            <th scope='col' className='text-center   font-semibold'>
              Retail Price
            </th>
            <th scope='col' className='text-center  font-semibold'>
              Quantity
            </th>
            <th scope='col' className='px-6 py-3'>
              Total
            </th>
          </tr>
          {props.products.map((item, ind) => {
            return (
              <tr
                className='bg-white border-b light:bg-green-800 dark:border-gray-700'
                key={ind}
              >
                <td className='px-6 py-4'>{item.item}</td>
                <td className='px-6 py-4'>{item.retailPrice}</td>
                <td className='px-6 py-4'>{item.quantity}</td>
                <td className='px-6 py-4'>
                  {item.quantity * item.retailPrice}
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={3} className='text-right font-bold'>
              Total
            </td>
            <td className='font-bold'>{totalSum}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
