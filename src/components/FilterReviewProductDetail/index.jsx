import React from 'react';
import Button from '../Button';
import { Rate } from 'antd';

function FilterReviewProductDetail() {
    return (
        <React.Fragment>
            <span>Filter</span>
            <Button>Semua</Button>
            <Button>Dengan Foto</Button>
            <Button>Dengan Deskripsi</Button>
            <Button>
                1
            <Rate defaultValue={1} count={1} />
            </Button>
            <Button>
                2
            <Rate defaultValue={1} count={1} />
            </Button>
            <Button>
                3
            <Rate defaultValue={1} count={1} />
            </Button>
            <Button>
                4
            <Rate defaultValue={1} count={1} />
            </Button>
            <Button>
                5
            <Rate defaultValue={1} count={1} />
            </Button>
        </React.Fragment>
    );
};

export default FilterReviewProductDetail;