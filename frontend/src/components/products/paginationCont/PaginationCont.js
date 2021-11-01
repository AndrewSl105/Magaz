import React, { useState } from 'react';
import { Box, Pagination } from '@material-ui/core';
import { useNavigate } from 'react-router';

const PaginationCont = props => {
    const { pages, page } = props;
    const [pageNumber, setPageNumber ] = useState(1);

    const navigate = useNavigate();

    const handleChange = (event, value) => {
        setPageNumber(value);
        navigate(`/products/page/${value}`)
    };

    return (
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
    )
}

export default PaginationCont;
