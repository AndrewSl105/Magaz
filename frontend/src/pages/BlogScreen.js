import React from 'react';
import { Box } from '@material-ui/core';
import BlogList from 'src/components/blog/BlogList';

const BlogScreen = () => {
    return (
        <Box sx={{ marginTop: '15vh', marginBottom: '5rem' }}>
            <BlogList />
        </Box>
    )
}

export default BlogScreen;
