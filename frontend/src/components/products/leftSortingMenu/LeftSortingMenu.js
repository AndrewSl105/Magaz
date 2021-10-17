import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Box,  List, ListItem, Checkbox, FormControlLabel, RadioGroup  } from '@material-ui/core';
import CategoryBox from '../categoryBox/CategoryBox';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { listCategories, listHashtags } from 'src/redux/actions/productActions';
import { Block } from 'src/pages/components-overview/Block';
import { useNavigate } from 'react-router';


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
    '& > *': { m: '8px !important' }
};

const LeftSortingMenu = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setCategory, pageNumber } = props;


    const [categoryArr, setCAtegoryArr] = useState([]);

    const categoriesList = useSelector((state) => state.categories);
    const hashtagsList = useSelector((state) => state.hashtags);
    const { categories } = categoriesList;
    const { hashtags } = hashtagsList;

    const formValues = {
        category: [],
    };

    useEffect(() => {
        dispatch(listCategories())
        dispatch(listHashtags())
    }, [dispatch])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            category: formValues.category || categories,
        },
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            console.log(values.category)
            setCategory(values.category)

          try {
            setSubmitting(false);
          } catch (error) {
            console.error(error);
            setSubmitting(false);
            setErrors(error);
          }
        } 
      });
    
    const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
    console.log(values)

    const onChangeHandler = (e) => {
        const newCat = [
            ...categoryArr, e.target.value
        ];
        setFieldValue('category', e.target.value);
    }

    return (
        <RootStyle>
            <Box 
                sx={{
                    marginTop: '2rem'
                }}
            >
                <FormikProvider value={formik}>
                    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                        <LoadingButton sx={{
                            marginTop: '1rem'
                        }} type="submit" fullWidth variant="contained" size="medium" loading={isSubmitting}>
                            Застосувати фильтри
                        </LoadingButton>
                    </Form>
                </FormikProvider >
            </Box>
        </RootStyle>
    )
}

export default LeftSortingMenu;
