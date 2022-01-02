import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Button, Checkbox, FormControlLabel, RadioGroup  } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { listCategories, listHashtags } from 'src/redux/actions/productActions';
import { Block } from 'src/pages/components-overview/Block';
import { useNavigate } from 'react-router';
import { listProducts } from '../../../redux/actions/productActions'
import { isObjectPropEquals } from '../../../utils/checkState'
import { getCategories, getHashtags } from 'src/utils/selectorUtils';

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.complex
      })
    }
}));

const style = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexFlow: 'column',
    width: '100%',
    flexWrap: 'wrap',
    padding: '1rem',
    overflow: 'auto',
    '& > *': { m: '5px !important' },
    maxHeight: '70vh'
};

const LeftSortingMenu = props => {
    const { setHashTags, setCategory, category } = props;
    
    const {
        categoriesList
      } = useSelector(state => ({
        categoriesList: getCategories(state),
    }), isObjectPropEquals);

    const {
        hashtagsList
      } = useSelector(state => ({
        hashtagsList: getHashtags(state),
    }), isObjectPropEquals);

    const { categories } = categoriesList;
    const { hashtags } = hashtagsList;

    const dispatch = useDispatch();
    const formValues = {
        category: [],
        hashtags: []
    };

    useEffect(() => {
        dispatch(listCategories())
        dispatch(listHashtags())
    }, [dispatch]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            category: formValues.category,
            hashtags: formValues.hashtags

        },
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            if (!category.includes(values.category)) {
                setCategory([...category, values.category]);
            }
          try {
            setSubmitting(false);
          } catch (error) {
            setSubmitting(false);
            setErrors(error);
          }
        } 
    });
    
    const { handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

    const onChangeHandler = (e) => {
        setFieldValue('category', e.target.value);
    };

    const clearFilters = () => {
        setCategory([]);
    };

    return (
        <RootStyle>
            <Box >
                <FormikProvider value={formik}>
                    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Box >
                            <Block title="Категории" sx={style}>
                                <RadioGroup  {...getFieldProps('category')}>
                                    {categories.map(item => {
                                        return <FormControlLabel
                                            onChange={onChangeHandler}
                                            key={item}
                                            value={item}
                                            control={<Checkbox />}
                                            label={item} />
                                    })}
                                </RadioGroup>
                            </Block>
                        </Box>
                        <Box sx={{
                                marginTop: '1rem'
                            }}>
                            <Block title="Хештеги" sx={style}>
                                <RadioGroup  {...getFieldProps('category')}>
                                    {hashtags.map(item => {
                                        return <FormControlLabel
                                            onChange={onChangeHandler}
                                            key={item}
                                            value={item}
                                            control={<Checkbox />}
                                            label={item} />
                                    })}
                                </RadioGroup>
                            </Block>
                        </Box>
                        <LoadingButton sx={{
                            marginTop: '1rem'
                        }} type="submit" fullWidth variant="contained" size="medium" loading={isSubmitting}>
                            Застосувати фильтри
                        </LoadingButton>
                        <Button sx={{
                            marginTop: '1rem'
                        }} fullWidth variant="contained" color='secondary' size="medium" onClick={clearFilters}>
                            Очистити фільтри
                        </Button>
                    </Form>
                </FormikProvider >
            </Box>
        </RootStyle>
    )
}

export default LeftSortingMenu;
