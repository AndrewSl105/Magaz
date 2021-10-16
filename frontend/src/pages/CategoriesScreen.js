import React from 'react';
import { styled } from '@material-ui/core/styles';
import Page from '../components/Page';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from 'src/redux/actions/productActions';
import { useEffect } from 'react';


const RootStyle = styled(Page)(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
}));

const CategoriesScreen = () => {
    const dispatch = useDispatch();
    const categoriesList = useSelector((state) => state.categories);

    const { categories, loading } = categoriesList;

    useEffect(() => {
        dispatch(listCategories())
      }, [dispatch])


    return (
        <RootStyle title="Products">
            <Container>
                {
                    categories.map(item => item)
                }
            </Container>
        </RootStyle>
    )
}

export default CategoriesScreen;
