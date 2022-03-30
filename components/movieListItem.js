import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function MovieListItem(props){
    const { movie } = props
    return(
        <>
        <ListItem>
        <ListItemText primary={movie.title} />
        </ListItem>
        </>
    )

}