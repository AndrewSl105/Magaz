import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/actions/productActions'

const Products = () => {
    const dispatch = useDispatch();
    const keyword = ''
    const category = ''
    const pageNumber = 1;

  useEffect(() => {
    dispatch(listProducts(keyword, category, pageNumber))
  }, [dispatch, keyword, category, pageNumber])

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList;

    return (
        <div>
            <ul>
                {
                    products.map(el => el)
                }
            </ul>
        </div>
    )
}

export default Products
