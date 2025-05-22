/* eslint-disable jsx-a11y/accessible-emoji */
import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Table } from './Table';
import { PanelUsersName } from './PanelUsersName';
import { Serch } from './Serch/Serch';

const usersName = usersFromServer.map(user => ({
  id: user.id,
  name: user.name,
}));

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    oneCategory => oneCategory.id === product.categoryId,
  );

  const user = usersFromServer.find(oneUser => oneUser.id === category.ownerId);

  return { ...product, category, user };
});

function productsFilter(elements, filter) {
  let copyProductsFilter = [...elements];

  if (filter.nameSelected === 'All') {
    return copyProductsFilter;
  }

  if (filter.nameSelected !== null) {
    copyProductsFilter = copyProductsFilter.filter(
      product => product.user.name === filter.nameSelected,
    );
  }

  if (filter.querySerch !== '') {
    const clearQuerySerch = filter.querySerch.trim().toLowerCase();

    copyProductsFilter = copyProductsFilter.filter(product => {
      return product.name.toLowerCase().includes(clearQuerySerch);
    });
  }

  return copyProductsFilter;
}

export const App = () => {
  const [nameSelected, setNameSelected] = useState('All');
  const [querySerch, setQuerySerch] = useState('');

  const filteredProducts = productsFilter(products, {
    querySerch,
    nameSelected,
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <PanelUsersName
              usersName={usersName}
              nameSelected={nameSelected}
              onClickChengeName={setNameSelected}
            />

            <Serch querySerch={querySerch} onChengeInput={setQuerySerch} />

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <Table products={filteredProducts} />
      </div>
    </div>
  );
};
