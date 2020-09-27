import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50ch',
        display: 'flex',
    },
    media: {
        height: 500,
        width: 500,
    },
    cover: {
        width: 200,
        height: 300,
    },

}));

const DetallePelicula = ({ detallePelicula }) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={detallePelicula.Poster}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {detallePelicula.Title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Año: {detallePelicula.Year}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Rating: {detallePelicula.Rated}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Duración: {detallePelicula.Runtime}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Género: {detallePelicula.Genre}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Director: {detallePelicula.Director}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
}

export default DetallePelicula;