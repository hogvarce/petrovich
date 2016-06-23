import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchItems } from '../actions';
import Item from './item';

class ItemsColumn extends Component {
    componentWillMount(){
       this.props.fetchItems();
   }
   renderItems(){
       let items = '';
       if ( this.props.all )
            items = this.props.all;
       if ( this.props.filtered && this.props.filtered.length > 0 )
            items = this.props.filtered;
       if (items == '')
            return(
                <div className="spinner hidden-phone">
                  <div className="spinner_item1"></div>
                  <div className="spinner_item2"></div>
                  <div className="spinner_item3"></div>
                  <div className="spinner_item4"></div>
                </div>
            );
       return items.map((item, i)=>{
           if (i >= 12) return;
           return(
               <div key={i}>
                <Item
                        id={item.id}
                        title={item.title}
                        code={item.code}
                        price={item.price}
                        diameterChuck={item.diameterChuck}
                        producer={item.producer}
                        appointment={item.appointment}
                        image={item.image}
                        hasBattery={item.hasBattery}
                        isNovel={item.isNovel}
                        isPromo={item.isPromo}
                 />
               </div>
           );
       });
   }
    render(){
        return(
            <div className="column_right column_right_products_container">
              <h1 className="page_title_big">Аккумуляторные дрели-шуруповерты</h1>
              <p className="category_total_products">Всего найдено товаров: <span className="category_total_products_counter">{(this.props.filtered && this.props.filtered.length >0 ) ? this.props.filtered.length: (this.props.all)? this.props.all.length : 0}</span>
              </p><a className="btn btn_orange btn_filter full_width visible-phone visible-xs" href="#">Добавить фильтр
                <svg className="ic ic_plus_circle">
                  <use xlinkHref="#plus_circle"/>
                </svg></a>
              <div className="product_table_controls clearfix">
                <ul className="product_table_sortings_list">
                  <li className="product_table_sorting_item"><span className="visible-lg">Сортировать :</span><span className="visible-md-inline-block visible-sm-inline-block visible-phone-inline-block visible-xs-inline-block">Сортировать по:</span></li>
                  <li className="product_table_sorting_item visible-md-inline-block visible-sm-inline-block visible-phone-inline-block visible-xs-inline-block">
                    <span className="sod_select niceselect_big" tabIndex="0" data-cycle="false" data-links="false" data-links-external="false" data-placeholder-option="false" data-filter=""><span className="sod_label">цене</span><span className="sod_list_wrapper"><span className="sod_list"><span className="sod_option  selected active " title="цене" data-value="цене">цене</span><span className="sod_option " title="названию" data-value="названию">названию</span><span className="sod_option " title="популярности" data-value="популярности">популярности</span><span className="sod_option " title="производителю" data-value="производителю">производителю</span></span></span><select className="niceselect" data-custom-classname="niceselect_big">
                      <option>цене</option>
                      <option>названию</option>
                      <option>популярности</option>
                      <option>производителю</option>
                    </select></span>
                  </li>
                  <li className="product_table_sorting_item visible-lg"><a className="product_table_sorting_link" href="#">по цене</a></li>
                  <li className="product_table_sorting_item visible-lg"><a className="product_table_sorting_link" href="#">по названию</a></li>
                  <li className="product_table_sorting_item visible-lg"><a className="product_table_sorting_link product_table_sorting_link_active" href="#">по популярности</a></li>
                  <li className="product_table_sorting_item visible-lg"><a className="product_table_sorting_link" href="#">по производителю</a></li>
                </ul>
                <div className="view_variant_switcher hidden-sm hidden-phone hidden-xs"><a className="view_variant_link" href="#">
                    <div className="ic_container">
                      <svg className="ic ic_table">
                        <use xlinkHref="#table"/>
                      </svg>
                    </div></a><a className="view_variant_link view_variant_link_active" href="#">
                    <div className="ic_container">
                      <svg className="ic ic_tile">
                        <use xlinkHref="#tile"/>
                      </svg>
                    </div></a></div>
              </div>

              {this.renderItems()}

              <div className="pagination_container hidden-phone" id="pagination_container">
                <p className="pagination_total">Товары 1 - 12 из 253</p>
                <ul className="pagination_links">
                  <li className="pagination_item"><a href="#"><i className="ic ic_arrow_start"></i></a></li>
                  <li className="pagination_item"><a href="#"><i className="ic ic_arrow_prev"></i></a></li>
                  <li className="pagination_item pagination_item_current"><a href="#">1</a></li>
                  <li className="pagination_item"><a href="#">2</a></li>
                  <li className="pagination_item"><a href="#">3</a></li>
                  <li className="pagination_item"><a href="#">4</a></li>
                  <li className="pagination_item pagination_item_disabled"><a href="#"><i className="ic ic_arrow_next"></i></a></li>
                  <li className="pagination_item pagination_item_disabled"><a href="#"><i className="ic ic_arrow_finish"></i></a></li>
                </ul>
              </div><a className="btn btn_show_more full_width" href="#">Показать еще</a>

            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        all: state.items.all,
        filtered: state.items.filtered
    }
}
export default connect(mapStateToProps, {fetchItems})(ItemsColumn);
