import { useState, useRef } from 'react';
import productService from '../../axios/productService';

//This component could be better, to much state is stored.
//Formik or react hook for example
const AddProductDialogLogic = (props) => {
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
    const handleSubmit = () => {
        productService.createProduct
            ({
                title: title,
                year: year,
                ingredients: ingredients
            })
            .then(response => {
                handleClose()
                setIngredients([])
                refreshParent()
            });
    }

    const addIngredients = () => {
        if (currentIngredientName != "" && currentIngredientQuantity != "") {
            counterId.current++;
            setIngredients(prevState => [...prevState, { "id": counterId.current, "title": currentIngredientName, "quantity": currentIngredientQuantity }])
            setCurrentIngredientName("")
            setCurrentIngredientQuantity("")
        }else{
            alert("Insert a valid Ingredient Name and Quantity")
        }
    }


    return {
        addIngredients, handleSubmit, handleOpen, setTitle, setYear,
        handleClose, setCurrentIngredientName, setCurrentIngredientQuantity,
        currentIngredientName, currentIngredientQuantity, open, ingredients
    };
}

export default AddProductDialogLogic;