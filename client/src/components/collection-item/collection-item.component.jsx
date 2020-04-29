import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import { CollectionItemContainer, CollectionItemImage, CollectionFooter, CollectionNameSpan, CollectionPriceSpan, AddToCartButton } from './collection-item.styles.jsx';

const CollectionItem = ({item, addItemAction }) => {

    const {name, price, imageUrl} = item;

    return (
    <CollectionItemContainer>
      <CollectionItemImage imageUrl = { imageUrl } />
      <CollectionFooter>
          <CollectionNameSpan> {name} </CollectionNameSpan>
          <CollectionPriceSpan> {price} </CollectionPriceSpan>
      </CollectionFooter>

      <AddToCartButton isInverted onClick={() => addItemAction(item)}>
          Add To Cart
      </AddToCartButton>

    </CollectionItemContainer>
    )
};

const mapDispatchToProps = (dispatch) => ({
    addItemAction: (item) => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);