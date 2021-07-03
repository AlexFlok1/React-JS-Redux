import { Grid, Paper, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scan } from '../actions'

const FormComponent = () => {

    //variables
    const [ msg, setMsg ] = useState( 'Badge Number' )
    const [ field, setField ] = useState( '' )
    const [ counter, setCounter ] = useState( 0 )

    //get data from reducer
    const scannedInfo = useSelector( state => state.ScanInfo )
    const dispatch = useDispatch();

    //start scaning data
    const submitInput = ( event ) => {

        event.preventDefault()

        //depend on the counter run specific dispatch
        switch( counter ){
            case 0:
                dispatch( scan( 'login',field ) )
                setCounter( counter + 1 )
                msg_setUp(1)
                break;
            case 1:
                dispatch( scan( 'wo', field ) )
                setCounter( counter + 1 )
                msg_setUp(2)
                break;
        }
        setField('')
        //dispatch( { type: 'operator', payload:  } )
    }
    const fieldChange = ( event ) => {
        setField( event.target.value )
    }

    const msg_setUp = ( index ) => {

        console.log(index)
        switch( index ){
            
            case 1:
                setMsg( 'Work Order' )
                break;
            case 2:
                setMsg( 'Serial Number' )
                break;
            case 4:
                break;

        }

    }

    //re-render each time data from reducer changes
    useEffect( () => {
       
        if ( counter > 1 ) {
            
            if( scannedInfo[ counter -1 ]['val'].includes( 'Error' ) ){
                console.log( counter )
                setCounter( counter - 1 );
                msg_setUp( counter - 1 )
    
            }

        }

    }, [ scannedInfo ] )

    return (
        <Grid container justify='center'>
            <Grid item xs={10} style={ { padding: '1vh' } }>
                <Paper elevation={3} style={ { maxHeight: '7vh', height: 'auto' } }>
                        <form autoComplete="off" onSubmit={ (event) => { submitInput( event ) } }>
                            <TextField onChange={ ( event ) => { fieldChange( event ) } } value={field} label={ `Please Scan `+ msg } variant="outlined" fullWidth={true} name="user_input" /> 
                        </form>
                </Paper>
            </Grid>
        </Grid>
    )

}

export default FormComponent