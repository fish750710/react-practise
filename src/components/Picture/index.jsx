import React from 'react';
import './index.scss';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const index = ({ data, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton variant='text' sx={{ fontSize: '3rem' }} />
          <Skeleton variant='rounded' width={300} height={'28vh'} />
          <Skeleton variant='rounded' width={300} height={25} />
        </Stack>
      ) : (
        <div className='picture'>
          <p>{data.photographer}</p>
          <div className='imageContainer'>
            <img src={data.src.large} alt=''></img>
          </div>
          <p>
            Download Image:
            <a href={data.src.large} target='_blank'>
              Click Here
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default index;
