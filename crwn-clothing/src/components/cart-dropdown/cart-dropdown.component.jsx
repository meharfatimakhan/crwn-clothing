import React from 'react';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux'
import { selectCartItemsCount} from '../../redux/cart/cart.selector'

import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.style.scss';

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(cartItem =>(
                    <CartItem key={cartItem.id} item={cartItem}/>
                ) )
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = (state) => ({
    cartItems: selectCartItemsCount(state)
})

export default connect(mapStateToProps)(CartDropdown);