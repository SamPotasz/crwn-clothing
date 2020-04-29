import React from 'react';
import { withRouter } from 'react-router-dom';

// import './menu-item.styles.scss';
import { MenuItemContainer, BackgroundImageContainer, ContentContainer, ContentTitleContainer, ContentSubtitleContainer } from './menu-item.styles.jsx';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
  <MenuItemContainer 
    size={ size }
    onClick={() => history.push(`${match.url}${linkUrl}`)} >

    <BackgroundImageContainer className='background-image'
        imageUrl={imageUrl} />
    <ContentContainer className='content'>
        <ContentTitleContainer>{title.toUpperCase()}</ContentTitleContainer>
        <ContentSubtitleContainer>SHOP NOW</ContentSubtitleContainer>
    </ContentContainer>
  </MenuItemContainer>
)

export default withRouter(MenuItem);