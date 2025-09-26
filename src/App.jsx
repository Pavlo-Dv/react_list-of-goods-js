import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

const SORT_ALPHABET = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';
const SORT_REVERSE = 'Reverse';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function getPreparedGoods(goods, sortField) {
  const preraredGoods = [...goods];

  if (sortField === SORT_REVERSE) {
    return preraredGoods.reverse();
  }

  if (sortField) {
    preraredGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_LENGTH:
          return good2.length - good1.length;

        default:
          return 0;
      }
    });
  }

  return preraredGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_ALPHABET,
          })}
          onClick={() => setSortField(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': sortField !== SORT_REVERSE,
          })}
          onClick={() => setSortField(SORT_REVERSE)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={classNames('button is-danger', {
            'is-light': sortField !== '',
          })}
          onClick={() => setSortField('')}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
