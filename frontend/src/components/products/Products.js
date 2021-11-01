import React, { useEffect, useState } from 'react';
import { ShopProductList } from '../_dashboard/e-commerce/shop';
import PaginationCont from './paginationCont/PaginationCont';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { listProducts } from 'src/redux/actions/productActions';
import {
    useLocation
} from "react-router-dom";

const Products = props => {
    const { keyword, category, hashTags } = props;

    const categoryList = category.toString();

    const productList = useSelector((state) => state.productList)
    const { loading, products, pages, page } = productList;
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const getPage = pathname.split('/page/').pop();

    useEffect(() => {
        dispatch(listProducts(keyword, categoryList, getPage))
    }, [dispatch, keyword, categoryList, getPage])

    return (
        <div>
            <ShopProductList products={products} isLoad={loading} />
            <PaginationCont pages={pages} page={page} />
        </div>
    )
}

export default Products;
