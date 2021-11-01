import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import { styled } from '@material-ui/core/styles';
import { Container} from '@material-ui/core';
import LeftSortingMenu from 'src/components/products/leftSortingMenu/LeftSortingMenu';
import Products from 'src/components/products/Products';

const ProductsScreen = () => {

    const [ category, setCategory ] = useState([]);
    const [ hashTags, setHashtags ] = useState('');
    const [ keyWord, setKeyWord ] = useState('');

    const RootStyle = styled(Page)(({ theme }) => ({
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        background: '#f4f4f4'
    }));

    return (
        <RootStyle title="Products">
            <Container
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 10fr',
                    padding: '1rem !important',
                    maxWidth: '1440px !important',
                    margin: '0 auto'
                }}
            >
                <LeftSortingMenu hashTags={hashTags} category={category} setHashtags={setHashtags} setCategory={setCategory} />
                <Container
                    sx={{
                        width: '100%',
                        maxWidth: '100% !important'
                    }}
                >
                    <Products category={category} hashTags={hashTags} keyword={keyWord} />
                </Container>
            </Container>
        </RootStyle>
    )
}

export default ProductsScreen;
