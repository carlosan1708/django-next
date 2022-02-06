import { useState, useRef } from 'react';
import { Typography, Grid, Button, Modal, TextField, Box } from '@mui/material';
import service from '../../axios/service'
import { DataGrid } from '@mui/x-data-grid';

const AddProduct = (props) => {
    const { refreshParent } = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredientName, setCurrentIngredientName] = useState("");
    const [currentIngredientQuantity, setCurrentIngredientQuantity] = useState();

    let counterId = useRef(0)
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'title',
            headerName: 'Title',
            width: 150
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
        },
    ];

    const handleSubmit = () => {
        service
            .post('http://127.0.0.1:8000/api/v1/products/', {
                title: title,
                year: year,
                ingredients: ingredients
            })
            .then(response => {
                handleClose()
                refreshParent()
            });
    }

    const addIngredients = () => {
        counterId.current++;
        setIngredients(prevState => [...prevState, { "id": counterId.current, "title": currentIngredientName, "quantity": currentIngredientQuantity }])
        setCurrentIngredientName("")
        setCurrentIngredientQuantity("")
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Add Product</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Grid container >
                                <Grid item xs={12}><Typography variant="h3">Product</Typography></Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="productName"
                                        label="Product Name"
                                        onChange={event => setTitle(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="year"
                                        label="Year"
                                        type="number"
                                        onChange={event => setYear(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container >
                                <Grid item xs={12}><Typography variant="h3">Ingredient</Typography></Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="ingredientName"
                                        label="Ingredient Name"
                                        value={currentIngredientName}
                                        onChange={event => setCurrentIngredientName(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="ingredientQuantity"
                                        label="Ingredient Quantity"
                                        value={currentIngredientQuantity}
                                        type="number"
                                        onChange={event => setCurrentIngredientQuantity(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={addIngredients}>Add Ingredient</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <div style={{ height: 300, width: '100%' }}><DataGrid
                                    rows={ingredients}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                /></div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default AddProduct;