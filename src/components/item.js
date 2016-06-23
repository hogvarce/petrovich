import React, { Component } from 'react';

export default class Item extends Component {
    render(){
        return(
            <div className="product"><span className="product_code">Код: {this.props.code}</span>
              <div className="tooltip_container product_status_tooltip_container">
              <a className="product_status" href="#">Есть в наличии</a>
                <div className="tooltip_content tooltip_product_status">
                  <header className="tooltip_product_status_header">Санкт-Петербург:</header>
                  <dl className="product_status_info">
                    <dt className="product_status_info_shop">Гатчина</dt>
                    <dd className="product_status_info_quantity">(267)</dd>
                  </dl>
                  <dl className="product_status_info">
                    <dt className="product_status_info_shop">Индустриальный</dt>
                    <dd className="product_status_info_quantity">(14)</dd>
                  </dl>
                  <dl className="product_status_info">
                    <dt className="product_status_info_shop">Мурманка</dt>
                    <dd className="product_status_info_quantity">(182)</dd>
                  </dl>
                  <dl className="product_status_info">
                    <dt className="product_status_info_shop">Парнас</dt>
                    <dd className="product_status_info_quantity">(47)</dd>
                  </dl>
                  <dl className="product_status_info">
                    <dt className="product_status_info_shop">Планерная</dt>
                    <dd className="product_status_info_quantity">(182)</dd>
                  </dl>
                  <dl className="product_status_info">
                    <dt className="product_status_info_shop">Салова</dt>
                    <dd className="product_status_info_quantity">(0)</dd>
                  </dl>
                  <dl className="product_status_info">
                    <dt className="product_status_info_shop">Славянка</dt>
                    <dd className="product_status_info_quantity">(182)</dd>
                  </dl>
                </div>
              </div>
              <div className="product_photo"><a href="#"><img className="product_img" alt={this.props.title} src={this.props.image} /></a></div>
              <div className="product_description">
                { (this.props.isPromo) ? <label className="sticker_time icon_tooltip_link tooltipstered"></label> : '' }
                { (this.props.isNovel) ? <label className="sticker_new"></label> : '' }
                <div className="icon_tooltip_content">
                  <p className="icon_tooltip_header">Распил материала</p>
                  <p>Товары с таким значком мы можем распилить, например для удобства транспортировки и подъёма на этаж, или для экономии на доставке.</p>
                  <p><a href="#">Подробнее</a></p>
                </div><a href="#">{this.props.title}</a>
              </div>
              <p className="product_price_club_card"><span className="product_price_club_card_text">По карте<br /> клуба</span>{this.props.price} р.</p>
              <p className="product_price_default">{Math.round(this.props.price * 0.95)} р.</p>
              <div className="product_count_wrapper">
                <div className="stepper">
                  <input type="text" className="product_count only_digit stepper-input" maxLength="3" name="product_id" value="1" /><span className="stepper-arrow up">
                    <svg className="ic ic_dropdown">
                      <use xlinkHref="#dropdown"/>
                    </svg></span><span className="stepper-arrow down">
                    <svg className="ic ic_dropdown">
                      <use xlinkHref="#dropdown"/>
                    </svg></span>
                </div>
              </div><a className="btn btn_cart" href="#">
                <svg className="ic ic_cart">
                  <use xlinkHref="#cart"/>
                </svg>В корзину</a><a className="product_add_compare" href="#"><span>Добавить к сравнению</span>
                <svg className="ic ic_compare_plus">
                  <use xlinkHref="#compare_plus"/>
                </svg></a>
            </div>
        )
    }
}
