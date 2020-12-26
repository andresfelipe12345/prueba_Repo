import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import './styles.css';
import Pelicula from '../Pelicula/Pelicula';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

}));

const Busqueda = () => {

    const classes = useStyles();
    const [nombrePelicula, setNombrePelicula] = useState('');
    const [listaPeliculas, setListaPeliculas] = useState([]);
    const apiKey = '39eeec10';
    const urlAPI = 'https://www.omdbapi.com/';

    const buscarPelicula = async () => {
        setListaPeliculas([]);
        if (nombrePelicula != '') {
            try {
                const resp = await fetch(`${urlAPI}?s=${nombrePelicula}&apikey=${apiKey}`);
                const data = await resp.json();
                if (data) {
                    setListaPeliculas(data.Search);
                }
            }
            catch (error) {
                console.error(error)
            }
        }
    }

    const verFavoritos = async () => {

        const array = [];
        const items = { ...localStorage };
        setListaPeliculas([]);
        console.log(items);
        for (let a in items) {
            try {
                let object = JSON.parse(localStorage.getItem(a));
                if (object.hasOwnProperty("imdbID")) {
                    array.push(object)
                }

            } catch (e) {
                console.log(e);
            }
        }

        setListaPeliculas(array);
        console.log(array);

    }

    const borrarFavoritos = () => {

        localStorage.clear();
        setListaPeliculas([]);

    }

    return (
        <div className="contenedor">
            <h1 className="titulo">Busca Por Titulos de Películas</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Nombre de Pelicula" value={nombrePelicula} onChange={e => setNombrePelicula(e.target.value)} />
                <Button variant="contained" color="primary" onClick={buscarPelicula}>
                    Buscar
                 </Button>
                <Button variant="contained" color="primary" onClick={verFavoritos}>
                    Ver Favoritos
                 </Button>
                <Button variant="contained" color="primary" onClick={borrarFavoritos}>
                    Borrar Storage
                 </Button>
            </form>

            {listaPeliculas && listaPeliculas.map((pelicula, idx) =>

                <Pelicula pelicula={pelicula} key={idx} />
            )}

            {!listaPeliculas && <Typography variant="h5" gutterBottom>
                No hay resultados
      </Typography>}
        </div>
    )
}

export default Busqueda;



