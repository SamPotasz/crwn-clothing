import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from '../collection/collection.container';


//match, location, history all passed in with routes
const  ShopPage = ({ fetchCollectionsStart, match }) => {
    
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]) 
    //passing in fetchCollectionsStart to avoid warning. it doesn't like props being passed in (even if they come from connect)
    
    return (
        <div className='shop-page'>
            <Route exact 
                path={`${match.path}`} 
                component={CollectionsOverviewContainer} />
            <Route 
                path={`${match.path}/:collectionId`} 
                component={CollectionContainer}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);