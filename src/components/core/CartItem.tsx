import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../context';
import { formatCurrency, setTransition } from '../../utils';
import { MdAdd, MdRemove, MdDelete } from '../../assets';
import { Button, ImageLoader } from '../ui';

interface CartItemProps {
  id: number;
  index: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  toggleCart: () => void;
}

export function CartItem({
  id,
  index,
  title,
  image,
  price,
  quantity,
  toggleCart
}: CartItemProps): JSX.Element {
  const { deleteProduct, handleProductQuantity } = useShoppingCart();

  const toProduct = `/product/${id}`;

  return (
    <motion.li
      {...setTransition({
        layout: true,
        delayIn: index * 0.02,
        direction: 'right',
        durationOut: 0.25
      })}
      key={id}
    >
      <div className='flex rounded-lg border border-border-primary'>
        <Link
          className='tab hidden rounded-r-none transition hover:brightness-90 
                     focus-visible:brightness-90 md:block'
          to={toProduct}
          onClick={toggleCart}
        >
          <ImageLoader
            divStyle='h-[108px] w-[110px] rounded-l-lg shrink-0 shrink-0 bg-white'
            imageStyle='h-full w-full p-4'
            src={image}
            alt={title}
          />
        </Link>
        <div className='flex w-full flex-col justify-between py-2 px-4'>
          <div>
            <Link
              className='tab overflow-hidden text-ellipsis font-medium text-white/90
                         transition [display:-webkit-box] [-webkit-line-clamp:1]
                         [-webkit-box-orient:vertical] hover:text-white'
              to={toProduct}
              onClick={toggleCart}
            >
              {title}
            </Link>
            <p className='font-bold'>{formatCurrency(price)}</p>
          </div>
          <div className='flex flex-wrap justify-between text-sm font-light'>
            <div className='flex gap-1'>
              <p>Quantity: </p>
              <input
                className='max-w-[60px] rounded-lg bg-background px-1 transition hover:ring-2 
                           hover:ring-accent focus:outline-none focus:ring-2 focus:ring-accent'
                type='number'
                min={1}
                max={10_000}
                value={quantity}
                onChange={handleProductQuantity(id)}
              />
            </div>
            <p>
              Total:{' '}
              <span className='font-semibold'>
                {formatCurrency(price * quantity)}
              </span>
            </p>
          </div>
        </div>
        <div className='grid border-l border-border-primary text-sm inner:rounded-none'>
          <Button
            className='!rounded-tr-lg disabled:text-gray-600 disabled:!brightness-100'
            ariaLabel='Increase'
            Icon={MdAdd}
            onClick={handleProductQuantity(id, 'increment')}
            disabled={quantity >= 10_000}
          />
          <Button
            className='border-y border-border-primary disabled:text-gray-600 disabled:!brightness-100'
            ariaLabel='Decrease'
            Icon={MdRemove}
            onClick={handleProductQuantity(id, 'decrement')}
            disabled={quantity <= 1}
          />
          <Button
            className='!rounded-br-lg'
            ariaLabel='Delete'
            Icon={MdDelete}
            onClick={deleteProduct(id)}
          />
        </div>
      </div>
    </motion.li>
  );
}
