import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState, useEffect } from 'react'
import { listCategories, listHashtags } from '../../../redux/actions/productActions'
// material
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Radio,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
  imageListItemBarClasses
} from '@material-ui/core';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from 'src/redux/actions/productActions';
import { uploadFile }  from 'react-s3';
import { Button } from '@material-ui/core';

// ----------------------------------------------------------------------

const GENDER_OPTION = ['Men', 'Women', 'Kids'];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] }
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function ProductNewForm({ isEdit, currentProduct }) {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  
  const productCreate = useSelector((state) => state.productCreate)
  const { success, error } = productCreate;
  console.log(success);

  useEffect(() => {
    dispatch(listCategories())
    dispatch(listHashtags())
  }, [dispatch])
  const [imagesUrls, setImagesUrls] = useState([]);

  const categoriesList = useSelector((state) => state.categories);
  const hashtagsList = useSelector((state) => state.hashtags);
  const { categories } = categoriesList;
  const { hashtags } = hashtagsList;

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().required('Price is required')
  });

  const S3_BUCKET ='shopimagescommerce';
  const REGION ='eu-central-1';
  const ACCESS_KEY ='AKIASET7NWTOSZKCTFGF';
  const SECRET_ACCESS_KEY ='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';

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      from: currentProduct?.from || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || '',
      priceSale: currentProduct?.priceSale || '',
      tags: currentProduct?.tags || [hashtags[0]],
      gender: currentProduct?.gender || GENDER_OPTION[2],
      category: currentProduct?.category || [categories[0]],
      visibility: currentProduct?.visibility || false
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {

      const handleUpload = async (file) => {
        return await uploadFile(file, config).then(result => result) || null;
      }

      const getImage = await handleUpload(values.images[0]);
      const urls = imagesUrls.map(el => el.path) || [];
      const gallery = [...urls, getImage.location];
      console.log(gallery);

      try {
          dispatch(createProduct({
            name: values.name,
            price: values.price,
            description: values.description,
            gallery: gallery,
            sku: values.sku,
            gender: values.gender,
            from: values.from,
            category: values.category,
            hashtags: values.tags,
            visibility: values.visibility
          }));
            setSubmitting(false);
            setImagesUrls([]);
            enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
          if (error) {
            enqueueSnackbar(!isEdit ? 'Unsuccessfull creacte!' : 'Update success', { variant: 'error' });
          }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    } 
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  console.log(values)

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue('images', []);
    setImagesUrls([])
  };

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };
  
  const fromVariants = [
    {title: 'ms drop', value: 'https/drop.com', type: 'site'},
    {title: 'google form', value: 'https/google.com', type: 'table'}
  ]

  const [imageUrl, setImageUrl] = useState();

  const handleChange = (event) => {
    setImageUrl(event.target.value);
  };

 // console.log(values);

  const addToImagesHandler = () => {
    const updatedUrls = [
      ...imagesUrls,
      {
        name: `name-${imageUrl}`,
        path: imageUrl,
        location: imageUrl,
        preview: `${imageUrl}`,
        key: imageUrl + new Date(),
      }
    ];
    setImagesUrls(updatedUrls)
  };

  const allImages = imagesUrls.concat(values.images);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Product Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <div>
                  <LabelStyle>Description</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.description}
                    onChange={(val) => setFieldValue('description', val)}
                    error={Boolean(touched.description && errors.description)}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.description && errors.description}
                    </FormHelperText>
                  )}
                </div>

                <div>
                  <LabelStyle>Add Images</LabelStyle>
                    <UploadMultiFile
                      showPreview
                      maxSize={3145728}
                      accept="image/*"
                      files={allImages}
                      onDrop={handleDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                      error={Boolean(touched.images && errors.images)}
                    />
                  {touched.images && errors.images && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.images && errors.images}
                    </FormHelperText>
                  )}
                </div>

                <TextField
                    fullWidth
                    label="Image Url"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment:
                      <span onClick={() => setImageUrl()} style={{cursor: 'pointer'}}>Clear </span>
                    }}
                  />

                <Button variant="contained" color="primary" onClick={addToImagesHandler}  >
                    Add image Url
                </Button>

              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <FormControlLabel
                  control={<Switch {...getFieldProps('visibility')} checked={values.visibility} />}
                  label="Visibility"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  <Autocomplete
                    fullWidth
                    options={fromVariants}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => {
                      setFieldValue('from', newValue.value);
                    }}
                    renderInput={(params) => <TextField fullWidth label="From" {...params}  />}
                  />
                  <TextField fullWidth label="Product SKU" {...getFieldProps('sku')} />

                  <div>
                    <LabelStyle>Gender</LabelStyle>
                    <RadioGroup {...getFieldProps('gender')} row>
                      <Stack spacing={1} direction="row">
                        {GENDER_OPTION.map((gender) => (
                          <FormControlLabel key={gender} value={gender} control={<Radio />} label={gender} />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </div>

                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" native {...getFieldProps('category')} value={values.category}>
                      {categories.map((category) => (
                          <option label={category} value={category}>
                            {category}
                          </option>
                      ))}
                    </Select>
                  </FormControl>
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={hashtags.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option} size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField label="Tags" {...params} />}
                  />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Regular Price"
                    {...getFieldProps('price')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />

                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Sale Price"
                    {...getFieldProps('priceSale')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                  />
                </Stack>

                <FormControlLabel
                  control={<Switch {...getFieldProps('taxes')} checked={values.taxes} />}
                  label="Price includes taxes"
                  sx={{ mt: 2 }}
                />
              </Card>

              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Create Product' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
