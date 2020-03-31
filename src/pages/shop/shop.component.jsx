import React from 'react';

import SHOP_DATA from './shop.data';

import CollectionPreview from '../../components/collection-preview/collection-preview';

class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA,
        }
    }

    render() {
        // console.log( this.state.collections );
        return <div>

        {
            this.state.collections.map(({id, ...otherProps}) => (
                <CollectionPreview key={id} {...otherProps}/>
            ))
        }
        </div>;
    }
}

export default ShopPage;