import Page from '../components/Page';
import { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Button, Typography, Container, Pagination } from '@material-ui/core';
import { ShopProductList } from 'src/components/_dashboard/e-commerce/shop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listProducts } from '../redux/actions/productActions'
import { useNavigate } from 'react-router';


const ProductsScreen = () => {
    const dispatch = useDispatch();
    const [pageNumber, setPage] = useState(1);
    const navigate = useNavigate();


    const RootStyle = styled(Page)(({ theme }) => ({
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(10)
    }));

    const keyword = ''
    const category = ''

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber))
  }, [dispatch, keyword, category, pageNumber])

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList;

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <RootStyle title="Products">
            <Container>
                <ShopProductList products={products} isLoad={loading} />
                <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <Pagination 
                    defaultPage={1} 
                    page={page} 
                    count={pages} 
                    variant="outlined" 
                    onChange={handleChange}
                    shape="rounded" 
                    sx={{
                        justifyContent: "center",
                        display: 'flex'
                    }}
                    />
                </Box>
            </Container>
        </RootStyle>
    )
}

export default ProductsScreen
