import React, { Component } from 'react';

import FilterColumn from './filter_column';
import ItemsColumn from './items_column';

export default class App extends Component {
  render() {
    return (
        <div>
            <FilterColumn />
            <ItemsColumn />
        </div>
    );
  }
}
