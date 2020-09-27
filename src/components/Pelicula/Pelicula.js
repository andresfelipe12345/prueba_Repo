import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './styles.css';
import DetallePelicula from '../DetallePelicula/DetallePelicula';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});



const useStyles = makeStyles((theme) => ({
    root: {
        width: '25ch',
    },
    media: {
        height: 300,
        width: 200,
    },
}));


const Pelicula = ({ pelicula }) => {


    const [open, setOpen] = React.useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [detallePelicula, setDetallePelicula] = useState('');

    const renderDetallePelicula = (idPelicula) => {
        console.log(idPelicula);
        buscarDetallePelicula(idPelicula);
        handleClickOpen();
    };

    const buscarDetallePelicula = async (idPelicula) => {
        const apiKey = '39eeec10';
        const urlAPI = 'http://www.omdbapi.com/';
        try {
            const resp = await fetch(`${urlAPI}?i=${idPelicula}&apikey=${apiKey}`);
            const data = await resp.json();
            console.log(data);
            if (data) {
                setDetallePelicula(data);
            }
        }
        catch (error) {
            console.error(error)
        }
    };

    const agregarFavorito = (pelicula) => {
        console.log(pelicula);
        localStorage.setItem(pelicula.imdbID, JSON.stringify(pelicula));
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    const classes = useStyles();
    let result;

    if (pelicula) {
        result =
            <div>
                <div className="cardContainer">
                    <Card className={classes.root}>
                        <CardActionArea onClick={() => renderDetallePelicula(pelicula.imdbID)}>
                            <CardMedia
                                className={classes.media}
                                image={pelicula.Poster}
                                title={pelicula.Title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {pelicula.Title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {pelicula.Year}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <Button size="small" color="primary" onClick={() => agregarFavorito(pelicula)}>
                            Guardar a Favoritos
                    </Button>


                    </Card>
                </div>

                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

                    {detallePelicula && <DetallePelicula detallePelicula={detallePelicula} />}
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbar}
                    message="Agregado a Favoritos"
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>


    } else {
        result = <div></div>
    }

    return (
        result
    );
}

Pelicula.propTypes = {
    pelicula: PropTypes.object,
}

export default Pelicula;

