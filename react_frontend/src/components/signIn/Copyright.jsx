import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://gitlab.sdm.im.ntu.edu.tw/group5/NTU_Lost/tree/master">
                NTU Lost
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;