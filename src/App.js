import { Grid, Paper } from '@material-ui/core'
import TableComponent from './componets/TableComponent'
import InfoComponent from './componets/InfoComponent'
import FormComponent from './componets/FormComponent'

function App() {

  return (
      <Grid container>

          <Grid item xs={12} style={ { height: '35vh' } }>
              <InfoComponent />
              <FormComponent />
          </Grid>

          <Grid item xs={12} style={ { maxHeight: '65vh', height: '63vh', padding:'1vh' } }>
                <Paper elevation={1} width={1} style={ { height:'100%', overflowY: 'scroll', padding:'1vh' } }>
                      <TableComponent />
                </Paper>
          </Grid>

      </Grid>
  );
}

export default App;
