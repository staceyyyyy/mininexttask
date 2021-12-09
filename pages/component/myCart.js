import React, {useEffect,useState} from 'react'
import createPersistedState from 'use-persisted-state';
import styles from '../../styles/Home.module.css'
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {
    Grid,Box,IconButton,Typography,
    Card,CardMedia,Snackbar,CircularProgress
  } from '@mui/material';
import Navbar from './Navbar'
export default function myCart() {
    const useCartState = createPersistedState('myCart');
    const [myCarts, setMyCarts] = useCartState([])
    const [open, setOpen] = useState(false);
    const moneyConvert = num =>{
        let arr = [];
        var reverse_val = num.toString().split('').reverse();
        let join = reverse_val.join('');
        for(let i=0,len = join.length; i<len; i+=3) {
            arr.push(join.substr(i,3))
        }
        return arr.join('.').split('').reverse().join('')
    }
    console.log(typeof myCarts)
    const sumProduct = myCarts.map((item)=>item[0].price_range.maximum_price.final_price.value)
    .reduce((partial_sum, a) => partial_sum + a, 0);
    const removeProductFromCart = ()=> {
        // let myCart = []
        // myCart = JSON.parse(localStorage.getItem('myCart')) || [];
        // Push the new data (whether it be an object or anything else) onto the array
        // myCart.push(data);
        // Alert the array value
        // Re-serialize the array back into a string and store it in localStorage
        // localStorage.setItem('myCart', JSON.stringify(myCart));
        // console.log('added',myCart)
        setOpen(true)
      }
      const handleClose = () => {
        setOpen(false);
      };
    const action = (
    <React.Fragment>
        <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        >
        <CloseIcon fontSize="small" />
        </IconButton>
    </React.Fragment>
    );
    return (
        <div className={styles.contentContainer}>
            <Navbar/>
            <h1>My Cart</h1>
            {typeof myCarts === undefined ? 
            <p>Your cart is empty. Start to add product to your cart</p>
            : myCarts.map((item,index) => 
                <div>
                    <Box sx={{ flexGrow: 1 }} key={index} style={{marginTop:"3rem"}}>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Card key={index} className={styles.cartCard}>
                                    <CardMedia
                                    component="img"
                                    image={item[0].image.url}
                                    alt={item[0].name}
                                    />
                                </Card>
                            </Grid>
                            <Grid item xs={3} component={Stack} direction="column" justifyContent="center">
                                <Typography variant="overline" display="block" gutterBottom style={{textAlign:'center'}}>
                                    {item[0].name}
                                </Typography>
                            </Grid>
                            <Grid item xs={3} component={Stack} direction="column" justifyContent="center">
                                <Typography variant="overline" display="block" gutterBottom style={{textAlign:'center'}}>
                                    {moneyConvert(item[0].price_range.maximum_price.final_price.value)}
                                </Typography>
                                <Typography variant="overline" display="block" gutterBottom style={{ textAlign:'center', textDecoration:'line-through'}} >
                                    {moneyConvert(item[0].price_range.maximum_price.regular_price.value)}
                                </Typography>
                            </Grid>
                            <Grid item xs={3} component={Stack} direction="column" justifyContent="center">
                            <IconButton aria-label="delete" style={{width:'fit-content'}}>
                                <DeleteIcon onClick={removeProductFromCart}/>
                            </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                )}
                <Typography variant="overline" display="block" gutterBottom style={{ textAlign:'center'}} >
                    TOTAL : {moneyConvert(sumProduct)}
                </Typography>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Remove Product from cart"
                action={action}
              />
        </div>
    )
}

