import { Avatar, Grid } from '@mui/material';
import React from 'react';
import { Typography } from '@mui/material';

const PersonalAcc = (avatar, children = 'dfgdfg', fullName) => {
    return (
        // <Grid container spacing={2}>
        <div>
            <div>
                {avatar
                    ? <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
                    : <Avatar>dfgdfg</Avatar>
                }
            </div>
            <div>
                {fullName
                    ? <Typography variant='h2' m={5}>{fullName}</Typography>
                    : <Typography variant='h2' m={5}>jodfjdfnjdfjdf</Typography>
                }
            </div>
        </div>
        // </Grid>
    );
};

export default PersonalAcc;