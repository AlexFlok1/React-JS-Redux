const defaultData = [ 

    { name: 'Operator', val: '' },
    { name: 'Work Order', val: ''},
    { name: 'Part #', val: ''},
    { name: 'Serial #', val: ''}
    
] 

const infoReducer = (data = defaultData, action ) => {
   
    switch( action.type ){
        case 'operator':
        case 'logout':
            data[0].val = action.payload
            break
        case 'wo':
            data[1].val = action.payload
            break
         case 'part':
            data[2].val = action.payload
            break
        case 'serial':
            data[3].val = action.payload
            break
        default:
            break
    }

    //this row is triggering to rerender 
    data = [ ...defaultData ]

    return data

}

export default infoReducer