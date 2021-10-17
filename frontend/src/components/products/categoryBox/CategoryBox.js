import React from 'react';
import { Block } from 'src/pages/components-overview/Block';
import { Checkbox, FormControlLabel, RadioGroup } from '@material-ui/core';


const style = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexFlow: 'column',
    width: '100%',
    flexWrap: 'wrap',
    '& > *': { m: '8px !important' }
};


const CategoryBox = props => {
    const { categoriesList, setFieldValue } = props;

    return (
        <div>
            <Block title="Категории" sx={style}>
                <RadioGroup  row>
                    {categoriesList.map(item => {
                            return <FormControlLabel
                                onChange={(val) => setFieldValue('category', val)}
                                key={item}
                                value={item}
                                control={<Checkbox />}
                                label={item} />
                        })}
                </RadioGroup>
            </Block>
        </div>
    )
}

export default CategoryBox;
