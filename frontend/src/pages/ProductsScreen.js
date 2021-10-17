import Page from '../components/Page';
import { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Container, Pagination } from '@material-ui/core';
import { ShopProductList } from 'src/components/_dashboard/e-commerce/shop';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listProducts } from '../redux/actions/productActions'
import { useNavigate } from 'react-router';
import {
    useLocation
} from "react-router-dom";
import LeftSortingMenu from 'src/components/products/leftSortingMenu/LeftSortingMenu';


const ProductsScreen = () => {
    const dispatch = useDispatch();
    const [pageNumber, setPage] = useState(1);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [category, setCategory] = useState('');

    const RootStyle = styled(Page)(({ theme }) => ({
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(1)
    }));

    const keyword = ''

    console.log(category)

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber))
  }, [dispatch, keyword, category, pageNumber])

  useEffect(() => {
    if (!pathname.includes(`/page/${pageNumber}`)) {
        setPage(pathname.split('/page/').pop())
    }
  }, [pageNumber, category])

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList;

    const handleChange = (event, value) => {
        setPage(value);
        navigate(`/products/page/${value}`)
    };

    return (
        <RootStyle title="Products">
            <Container
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 10fr',
                    padding: '1rem !important',
                    maxWidth: '1800px !important',
                    margin: '1rem !important'
                }}
            >
                <LeftSortingMenu setCategory={setCategory} pageNumber={pageNumber} />
                <Container
                        sx={{
                            width: '100%',
                            maxWidth: '100% !important'
                        }}
                    >
                    <ShopProductList products={products} isLoad={loading} />
                    <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                        <Pagination 
                            defaultPage={1} 
                            page={page} 
                            count={pages || 2} 
                            variant="outlined" 
                            onChange={handleChange}
                            shape="rounded" 
                            size="large" 
                            sx={{
                                justifyContent: "center",
                                display: 'flex',
                                marginTop: '2rem'
                            }}
                        />
                    </Box>
                </Container>
            </Container>
        </RootStyle>
    )
}

export default ProductsScreen
