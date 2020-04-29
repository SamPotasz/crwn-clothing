import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import Spinner from '../../components/spinner/spinner.component';

const CollectionsOverviewContainer = lazy(() => import( '../../components/collections-overview/collections-overview.container' ));
const CollectionContainer = lazy(() => import( '../collection/collection.container' ));

//match, location, history all passed in with routes
const  ShopPage = ({ fetchCollectionsStart, match }) => {
    
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]) 
    //passing in fetchCollectionsStart to avoid warning. it doesn't like props being passed in (even if they come from connect)
    
    return (
      <div className='shop-page'>
        <Suspense fallback={<Spinner />}>
          <Route exact 
              path={`${match.path}`} 
              component={CollectionsOverviewContainer} />
          <Route 
              path={`${match.path}/:collectionId`} 
              component={CollectionContainer}/>
          </Suspense>
      </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);