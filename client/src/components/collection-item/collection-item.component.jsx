import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({item, addItemAction }) => {

    const {name, price, imageUrl} = item;

    return (
    <div className = 'collection-item'>
        <div className='image'
            style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="collection-footer">
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>

        <CustomButton isInverted onClick={() => addItemAction(item)}>
            Add To Cart
        </CustomButton>

    </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    addItemAction: (item) => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);