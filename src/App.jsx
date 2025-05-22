/* eslint-disable jsx-a11y/accessible-emoji */
import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Table } from './Table';
import { PanelUsersName } from './PanelUsersName';

const usersName = usersFromServer.map(user => ({
  id: user.id,
  name: user.name,
}));

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    oneCategory => oneCategory.id === product.categoryId,
  ); // find by product.categoryId

  const user = usersFromServer.find(oneUser => oneUser.id === category.ownerId); // find by category.ownerId

  return { ...product, category, user };
});

function productsFilter(filter, { nameSelected }) {
  let copyProductsFilter = [...filter];

  if (nameSelected === 'All') {
    return copyProductsFilter;
  }

  if (nameSelected !== null) {
    copyProductsFilter = copyProductsFilter.filter(
      product => product.user.name === nameSelected,
    );
  }

  return copyProductsFilter;
}

export const App = () => {
  console.log(products);
  // console.log(usersFromServer);
  const [nameSelected, setNameSelected] = useState('All');

  const filteredProducts = productsFilter(products, { nameSelected });

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

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

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
