import Settings from '../settings'

//class to send api requests
class Db {

    #url = new Settings().getOldApi()
    #params

    constructor( req_url, params ){
            this.#url = this.#url + req_url
            this.#params = params
    }

    send_Get = async () => {

            return await fetch ( this.#url + '?' + ( Object.keys( this.#params ).map( key => `${key}=${this.#params[key]}` ).join('&') ) )
            .then( data => data.json() )
            .catch( err => { throw new Error( err ) } )

    }

}

const scan = ( scanType = '', value = '' ) => async ( dispatch ) => { 
    
    let wrongScan = false
    let error_msg = ''

    switch( scanType ){

        //check if user has permission to use this tool
        case 'login':
            let user_req = new Db( 'users/matrix', { id: value, machine: 152 } )
            dispatch ({ 
                type: 'operator',
                payload: await user_req.send_Get()   
            } )
            break;
        case 'wo':

            //send request to api to check if workorder exist
            let query = `query{
                saddle_workOrder(wo:"` + value + `"){
                  WorkOrder,
                  Part,
                  Qty,
                  OD,
                  Gage
                }
              }`
            fetch( new Settings().getApi(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { query } )
            } )
            .then( res => res.json() )
            .then( info => {
                 //dispatch base on scan result
                if( info.data.saddle_workOrder === null){

                    dispatch( { 
                        type: 'invalid scan',
                        payload: 'Invalid Workorder. Please check your scan. Thank you.' 
                    } )
                } 
                else{
                   
                    dispatch({
                        type: 'wo',
                        payload: info.data.saddle_workOrder.WorkOrder
                    });
                    dispatch({
                        type: 'part',
                        payload: info.data.saddle_workOrder.Part
                    }) 
                    
                }
               
            } )

            break;
        case 'part':
            dispatch ({
                type: 'part',
                payload: value 
            })
            break;
        case 'serial':
            dispatch ({
                type: 'serial',
                payload: value 
            })
            break;
        case 'logout':
            dispatch ({
                type: 'logout',
                payload: '' 
            })
            break;
        default:
            console.log( 'default action' )

    }

    if( wrongScan )
        dispatch({
            type: scanType,
            payload : error_msg
        })
    
}

export { scan }