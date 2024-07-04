import React, { useContext } from 'react';
import {observer} from 'mobx-react-lite'
import { Context } from '..';
import { Pagination } from 'react-bootstrap';
const Pages = observer(() => {
    const {flat}= useContext(Context)
    const pageCount = Math.ceil(flat.totalCount / flat.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <Pagination className='mt-5'>
              {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={flat.page === page}
                    onClick={() => flat.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;