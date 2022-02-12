import { useEffect, useState } from 'react';
import productService from '../../axios/productService';
import Router from 'next/router'
import { Typography } from '@mui/material';

const ProductPageLogic = () => {
    const [formulaData, setProductData] = useState([])
    const [ingredientHistory, setIngredientHistory] = useState([])
    const [refresh, setRefresh] = useState([])
    const [displayChart, setDisplayChart] = useState(false)
    const refreshParent = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        productService.getProducts()
            .then(response => {
                setProductData(response.data.results)
            }).catch(function (error) {
                alert("Please log in again")
                Router.push('/log-in')
            })
    }, [refresh]);

    useEffect(() => {
        const chartData = []
        productService.getProductIngredientsSum()
            .then(response => {
                let counter = 0;
                for (const object of response.data) {
                    chartData.push({ 'x': object[0], 'y': object[1] })
                    counter++
                }
                const chartDict = [{ id: 1, data: chartData }]
                setIngredientHistory(chartDict)
                setDisplayChart(true)
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

    return { ingredientHistory, formulaData, displayChart, refreshParent, renderIfValue, };
}

export default ProductPageLogic;
