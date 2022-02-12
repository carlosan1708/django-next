import { Typography, Grid, Button, Modal, TextField, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddProductDialogLogic from './AddProductDialogLogic'
import useFocus from '../../customHook/useFocus'

//It will have been nice with Typescript :), but there is no much props been passed or time.  
const AddProductDialog = (props) => {
    const { addIngredients, handleSubmit,
        handleOpen, setTitle, setYear,
        open, handleClose, currentIngredientName,
        currentIngredientQuantity, ingredients,
        setCurrentIngredientName, setCurrentIngredientQuantity,
    } = AddProductDialogLogic(props)

    const [inputRef, setInputFocus] = useFocus()

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
                        <Grid item xs={12}>
                            <Grid container  spacing={2} >
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
                        <Grid item xs={6}>
                            <Grid container   spacing={2}>
                                <Grid item xs={12}><Typography variant="h3">Ingredient</Typography></Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={inputRef}
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
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                addIngredients();
                                                setInputFocus();
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={addIngredients}>Add Ingredient</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
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

export default AddProductDialog;