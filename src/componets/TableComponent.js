import { Grid, Accordion, AccordionSummary, AccordionDetails, Paper } from '@material-ui/core'
import { useEffect, useState } from 'react'

//importing settings
import Settings from '../settings'

//class for API
class API{

    #query
    constructor(){}

    setQuery = ( query ) => this.#query = query

    send_Request = async () => {

        return await fetch( new Settings().getApi(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { query: this.#query } )
        } ). then( res => res.json() )
    }

}

const TableComponent = () => {

    const [ data, setData ] = useState( [] );
    const [details, setDetails ] = useState( [] )
    const [ panel, setPanel ] = useState( -1 )

    const get_data = async () => {

        let query = `query{
            glue_station_query1{
              WO,
              Part,
              Scans,
              Qty,
            }
          }`

        let api = new API();
        api.setQuery( query );
        let result = await api.send_Request()
        setData( result.data.glue_station_query1 )

    }

    const get_data_wo = async ( wo, index ) => {
        setDetails([])
        let query = `query{
            saddle_workOrder(wo:"` + wo + `"){
              Time,
              QR_Id,
              Operator
            }
          }`
        let api = new API();
        api.setQuery( query );
        let result = await api.send_Request();

        //check if panel already open
        ( panel === index ) ? setPanel( -1 ) : setPanel( index );
        //upload details  
        setDetails( result.data.saddle_workOrder )
    }

    useEffect(()=>{
        
            get_data()

    }, [])

    const [ header ] = useState( [ 'Time Stamp', 'Part #', 'WO', 'Gage', 'Tested', 'Scanned' ] )

    return (
        <>
            <Grid container >
                <Grid item  xs={12}>
                    {
                        data.map( ( el, index ) => (
                            <Accordion style={ { width: '100%' } } key={ index }  expanded={ panel === index }>
                                <AccordionSummary onClick={ () => get_data_wo( el.WO.trim(), index ) }>
                                   <Grid container>
                                     
                                        <Grid item xs={3} style={ { textAlign: 'center' } }>
                                                <h3>WO: { el.WO }</h3>
                                        </Grid>
                                        <Grid item xs={3} style={ { textAlign: 'center' } }></Grid>
                                        <Grid item xs={4} style={ { textAlign: 'center' } }>
                                            <div style={ { display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' } }>
                                                <span style={ { display: 'inline-block', fontSize: '1.3rem' } }><b>Part:</b> { el.Part.trim() }</span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={2} style={ { textAlign: 'center' } }>
                                            <div style={ { display: 'flex', height: '100%', width: '100%', alignItems: 'center' } }>
                                               <Paper elevation={1} style={ { width: '100%', background: ( el.Scans/el.Qty * 100 < 40 ) 
                                               ? '#ed5555' 
                                               : ( el.Scans/el.Qty * 100 > 40 && el.Scans/el.Qty * 100 < 90 ) ? '#ede56f' : '#5cd687', padding: '10px' } }>
                                                   <h4 style={ { margin: '0' } }>Scanning</h4>
                                                    <span style={ { display: 'inline-block', fontSize: '1.3rem' } }>{ el.Scans }/<b>{ el.Qty }</b></span>
                                               </Paper>
                                            </div>
                                        </Grid>

                                   </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                {
                                                    details && details.map( ( scan, index ) => (
                                                        <div key={index} style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' } }>
                                                             <span style={ { padding:'10px 0px', width: '33%', textAlign: 'center', fontSize:'1rem' } }>{ scan.Time }</span>
                                                             <span style={ { padding:'10px 0px', width: '33%', textAlign: 'center', fontSize:'1rem' } }>{ scan.QR_Id }</span>
                                                             <span style={ { padding:'10px 0px', width: '33%', textAlign: 'center', fontSize:'1rem' } }>{ scan.Operator }</span>
                                                        </div>
                                                    ) )
                                                }
                                            </Grid>
                                        </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ) )
                    }
                </Grid>
            </Grid>
        </>
    )

}

export default TableComponent

