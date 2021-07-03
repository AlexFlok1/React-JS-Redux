import { Grid, Paper, Button, Avatar, List, ListItem, ListItemText } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scan } from '../actions'

const InfoComponent = () => {

    const scannedInfo = useSelector( state => state.ScanInfo )
    const dispatch = useDispatch();

    useEffect( () => {
        console.log( scannedInfo )
    }, [scannedInfo] )

    return (
        <Grid container >
            <Grid item xs={12}  style={ { padding: '1vh' } }>
                <Paper elevation={3} style={ { height: '25vh' } }>
                        <Grid container style={ { height: '100%' } }>
                            <Grid item xs={3} style={ { height: '100%' } }>
                                <Paper elevation={1} style={ { width: '90%', height: '90%', margin: '2.5% 2.5%', display: 'flex' } }>
                                    <Grid container style={ { display: 'flex', height: '100%', justifyContent: 'left', alignItems: 'center', flexDirection: 'row' } }>
                                        <List>
                                            {
                                                scannedInfo.map( ( el, index ) => (
                                                    <ListItem key={ index }>
                                                        <ListItemText primary={ el.name + ":" + ( ( index === 0 ) ? el.val?.Id || '' : ( ( el.val.toString().indexOf('Error') === -1 ) ? el.val : '' ) ) } />
                                                    </ListItem>
                                                ) )
                                            }
                                        </List>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                    
                            </Grid>
                            <Grid item xs={3}>
                                <div style={ {display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' } }>
                                {
                                    ( scannedInfo[0].val !== '' ) ?
                                        <div style={ {display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%', width: '100%', flexDirection: 'column' } } >
                                            <Avatar style={{ height: '150px', width: '150px' }} alt="Remy Sharp" src={ scannedInfo[0].val.Name } alt={ scannedInfo[0].val.Name }  />
                                            <br></br>
                                            <Button variant="contained" color="primary" onClick={ ()=> { dispatch( scan( 'logout' ) ) } }>Sign Out</Button>
                                        </div>
                                        :
                                        <h3>No User</h3>
                                }
                                </div>
                            </Grid>
                        </Grid>
                </Paper>
            </Grid>
        </Grid>
    )

}

export default InfoComponent