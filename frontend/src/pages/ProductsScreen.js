import Page from '../components/Page';
import { styled } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';
import { ShopProductList } from 'src/components/_dashboard/e-commerce/shop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listProducts } from '../redux/actions/productActions'


const ProductsScreen = () => {
    const dispatch = useDispatch();

    const RootStyle = styled(Page)(({ theme }) => ({
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(10)
    }));

    const keyword = ''
    const category = ''
    const pageNumber = 1;

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber))
  }, [dispatch, keyword, category, pageNumber])

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList;
    console.log(products);

    return (
        <RootStyle title="Products">
            <Container>
                <ShopProductList products={products} isLoad={loading} />
            </Container>
        </RootStyle>
    )
}

export default ProductsScreen
