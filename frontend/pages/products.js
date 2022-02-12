
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Container, Typography } from '@mui/material';
import AddProductDialog from '../components/product/AddProductDialog'
import dynamic from 'next/dynamic'
import ProductPageLogic from './logic/ProductPageLogic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/product/ChartHistory'),
  { ssr: false }
)

const ProductsPage = () => {
  const { ingredientHistory, formulaData, displayChart, refreshParent, renderIfValue } = ProductPageLogic()
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 150
    },
    {
      field: 'year',
      headerName: 'Year',
    },
    {
      field: 'ingredients',
      headerName: 'Ingredients',
      width: 400,

      renderCell: (params) => (
        renderIfValue(params.value)

      )
    },
  ];

  return (
    <Container>
      <Grid container>
        {displayChart && <>
        <Grid item xs={12} style={{ marginTop: '3rem' }}>
          <Typography variant="h4">Ingredient Quantity over Time</Typography>
        </Grid>
        <Grid item xs={12}>
          <DynamicComponentWithNoSSR ingredientHistory={ingredientHistory} />
        </Grid></>
        }
        <Grid item xs={12} style={{ marginTop: '3rem' }}>
          <Typography variant="h4">Product History</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '1rem' }}>
          <div style={{ height: 300, width: '100%' }}><DataGrid
            rows={formulaData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          /></div></Grid>
        <Grid item xs={10}>
          <AddProductDialog refreshParent={refreshParent} />
        </Grid>
      </Grid>

    </Container>);
};

export default ProductsPage;