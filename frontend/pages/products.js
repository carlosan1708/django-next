import { useEffect, useState } from 'react';
import service from '../axios/service'
import Router from 'next/router'
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Container, Button, Typography } from '@mui/material';
import AddProduct from '../components/product/AddProduct'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/product/ChartHistory'),
  { ssr: false }
)

const ProductsPage = () => {

  const [formulaData, setProductData] = useState([])
  const [ingredientHistory, setIngredientHistory] = useState([])

  const [refresh, setRefresh] = useState([])
  const refreshParent = () => {
    setRefresh(!refresh);
  }
  useEffect(() => {
    service
      .get('http://127.0.0.1:8000/api/v1/products/')
      .then(response => {
        setProductData(response.data.results)
      }).catch(function (error) {
        alert("Please log in again")
        Router.push('/log-in')
      })
  }, [refresh]);

  useEffect(() => {
    const chartData = []
    service
      .get('http://127.0.0.1:8000/api/v1/products/ingredients/')
      .then(response => {
        let counter = 0;
        for (const object of response.data) {
          chartData.push({ 'x': object[0], 'y': object[1] })
          counter++
        }
        const chartDict = [{ id: 1, data: chartData }]
        setIngredientHistory(chartDict)
        console.log(chartDict)
      }).catch(function (error) {
        console.log(error)
      })
  }, [refresh]);

  const renderIfValue = (value) => {
    if (value.length > 0) {
      var names = value.map(function (item) {
        return item['title'] + ":" + item['quantity'] + " // ";
      });
      return (<Typography variant="subtitle2">
        {names}
      </Typography>)
    }
  }
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
        <Grid item xs={12} style={{ marginTop: '3rem' }}>
          <Typography variant="h4">Ingredient Quantity over Time</Typography>
        </Grid>
        <Grid item xs={12}>
          <DynamicComponentWithNoSSR ingredientHistory={ingredientHistory} />
        </Grid>
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
          <AddProduct refreshParent={refreshParent} />
        </Grid>
      </Grid>

    </Container>);
};

export default ProductsPage;