import React from 'react';
import { styled } from '@material-ui/core/styles';
import Page from '../components/Page';
import { Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from 'src/redux/actions/productActions';
import { useEffect } from 'react';
import ComponentCard from '../components/_external-pages/components-overview/ComponentCard';
import { categories } from '../components/products/leftSortingMenu/data';


const RootStyle = styled(Page)(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
}));

const CategoriesScreen = () => {
    const dispatch = useDispatch();
    // const categoriesList = useSelector((state) => state.categories);

    // const { categories, loading } = categoriesList;
    console.log(categories);

    useEffect(() => {
        dispatch(listCategories())
      }, [dispatch])


    return (
        <RootStyle title="Products">
            <Container>
                <Grid sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>
                    {
                        categories.map(item => {
                            return <ComponentCard key={item.mainCategory} item={item} />
                        })
                    }
                </Grid>
            </Container>
        </RootStyle>
    )
}

export default CategoriesScreen;
