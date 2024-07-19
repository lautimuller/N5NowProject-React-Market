import React, { useContext, useState } from "react";
import { Modal, Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import "../styles/AddProductModal.scss";
import { CartContext } from '../contexts/CartContext';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
  const { addProduct } = useContext(CartContext);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    amount: 0,
    id: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addProduct(newProduct);
    onClose();
  };

  return (
    <Modal className="modal-block" open={open} onClose={onClose}>
      <Box className="modal-box">
        <Paper elevation={3} className="modal-paper">
          <Typography variant="h6" gutterBottom>
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  variant="outlined"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  type="number"
                  variant="outlined"
                  name="amount"
                  value={newProduct.amount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button onClick={onClose} variant="outlined" color="secondary" style={{ marginRight: '8px' }}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Add Product
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
