import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFilters, fetchItems } from '../actions';

export default class FilterColumn extends Component {
    componentWillMount(){
       this.props.fetchFilters();
   }
    onChangeFilter(event){
        let filters = [];
        let inputs = document.querySelectorAll('.filters_container input');
        for (let i in inputs){
            if (inputs[i].checked){
                if (inputs[i].getAttribute('value') == 'all'){
                    filters = [];
                    break;
                }
                filters.push(inputs[i].getAttribute('value'));
            }
        }
        this.props.fetchItems(filters);
    }
    renderFilters(filters, flag){
        if ( !filters ) return(
            <div className="spinner hidden-phone">
              <div className="spinner_item1"></div>
              <div className="spinner_item2"></div>
              <div className="spinner_item3"></div>
              <div className="spinner_item4"></div>
            </div>
        );
        switch (flag) {
            case 'promo':
            return filters.map((filter, i)=>{
                return (
                     <li className="filter_item" key={i}>
                     <label className="filter_label"><span className="checkbox_input_small">
                        <input value={Object.keys(filter)} onChange={this.onChangeFilter.bind(this)} type="checkbox" /><span className="checkbox_button"></span></span>
                        <span className="filter_label_name">{filter[Object.keys(filter)]}</span></label>
                    </li>
                )
            });
            case 'price':
            return (
                <ul className="filters_list">
                <li className="filter_item">
                    <label className="filter_label_price">от</label>
                    <input type="text" className="textInput full_width" placeholder={filters.min + 'p.'} />
                  </li>
                 <li className="filter_item">
                    <label className="filter_label_price">до</label>
                    <input type="text" className="textInput full_width" placeholder={filters.max + 'p.'} />
                 </li>
                </ul>
            )
            case 'producer':
            return filters.map((filter, i)=>{
                return (
                    <li className="filter_item" key={i}>
                      <label className="filter_label"><span className="checkbox_input_small">
                          <input type="checkbox" value={filter}  /><span className="checkbox_button"></span></span>
                          <span className="filter_label_name">{filter}</span></label>
                    </li>
                )
            });
            case 'appointment':
            return filters.map((filter, i)=>{
                return(
                    <li className="filter_item" key={i}>
                      <label className="filter_label"><span className="checkbox_input_small">
                          <input type="checkbox" value={filter} />
                          <span className="checkbox_button"></span></span>
                          <span className="filter_label_name">{filter}</span></label>
                    </li>
                )
            });
        }
    }
    render(){
        return(
            <div className="column_left">
              <div className="filters_container">
                <div className="filters_block">
                  <h2 className="row_products_header_title visible-phone visible-xs">Фильтры</h2>
                  <div className="filters_container_inner filters_container_inner_open">
                    <ul className="filters_list">
                      {this.renderFilters(this.props.filters.promo, 'promo')}
                    </ul>
                  </div>
                  <div className="filters_container_inner filters_container_inner_open">
                    <p className="filters_container_inner_header"><a className="filters_container_inner_link" href="#">Цена:</a></p>
                        {this.renderFilters(this.props.filters.price, 'price')}
                  </div>
                  <div className="filters_container_inner filters_container_inner_open">
                    <p className="filters_container_inner_header"><a className="filters_container_inner_link" href="#">Производитель:</a></p>
                    <ul className="filters_list">
                        {this.renderFilters(this.props.filters.producer, 'producer')}
                    </ul><a className="filters_more_link" href="#">Показать все</a>
                  </div>
                  <div className="filters_container_inner filters_container_inner_open">
                    <p className="filters_container_inner_header"><a className="filters_container_inner_link" href="#">Назначение:</a></p>
                    <ul className="filters_list">
                        {this.renderFilters(this.props.filters.appointment, 'appointment')}
                    </ul>
                  </div>
                  <div className="filters_container_inner filters_container_inner_open">
                    <p className="filters_container_inner_header"><a className="filters_container_inner_link" href="#">Диаметр патрона, мм:</a></p>
                    <ul className="filters_list">
                      <li className="filter_item">
                        <input type="text" className="textInput" />
                      </li>
                    </ul>
                  </div>
                  <div className="filters_container_inner filters_container_inner_open">
                    <p className="filters_container_inner_header"><a className="filters_container_inner_link" href="#">Съемный аккумулятор:</a></p>
                    <ul className="filters_list">
                      <li className="filter_item">
                        <label className="filter_label"><span className="checkbox_input_small">
                            <input type="checkbox" checked="" /><span className="checkbox_button"></span></span><span className="filter_label_name">Да</span></label>
                      </li>
                    </ul>
                  </div>
                  <button className="btn btn_grey btn_filters_apply" type="submit">Применить фильтры</button><a className="filters_reset_link" href="#">Сбросить все фильтры</a>
                </div>
              </div>
              <div className="block_container banner_container column_left_banner hidden-sm hidden-phone hidden-xs"><a target="_blank" href="#"><img width="240" height="400" alt="" src="misc/banner_240x400.png" /></a></div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        filters: state.filters.filters
    }
}
export default connect(mapStateToProps, {fetchFilters, fetchItems})(FilterColumn);
