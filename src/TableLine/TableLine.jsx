import cn from 'classnames';
import { SEX } from '../constants';

export const TableLine = ({ product }) => {
  return (
    <tr key={product.id} data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {product.id}
      </td>

      <td data-cy="ProductName">{product.name}</td>
      <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

      <td
        data-cy="ProductUser"
        className={cn('', {
          'has-text-link': product.user.sex === SEX.male,
          'has-text-danger': product.user.sex === SEX.fimale,
        })}
      >
        {product.user.name}
      </td>
    </tr>
  );
};
