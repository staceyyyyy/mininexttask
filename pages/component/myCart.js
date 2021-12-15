import React, {useState} from 'react'
import createPersistedState from 'use-persisted-state';
import styles from '../../styles/Home.module.css'
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import Navbar from './Navbar'
import {
    Grid,Box,IconButton,Typography,
    Card,CardMedia,Snackbar,
  } from '@mui/material';
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
    let holder = {}
    myCarts.forEach(function(d) {
        if(holder.hasOwnProperty(d.id)) {
            holder[d.id] = holder[d.id] + d.price_range.maximum_price.final_price.value;
        }else {
            holder[d.id] = d.price_range.maximum_price.final_price.value
        }
    })
    const resultList = [...myCarts.reduce( (mp, o) => {
        if (!mp.has(o.id)) mp.set(o.id, { ...o, count: 0 });
        mp.get(o.id).count++;
        return mp;
    }, new Map).values()];
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
    const sumProduct = resultList.map((item)=>item.price_range.maximum_price.final_price.value)
                    .reduce((partial_sum, a) => partial_sum + a, 0);
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
            {typeof resultList === undefined ? 
            <p>Your cart is empty. Start to add product to your cart</p>
            : resultList.map((item,index) => 
                <div key={index}>
                    <Box sx={{ flexGrow: 1 }} key={index} style={{marginTop:"3rem"}}>
                        <Grid container spacing={1} >
                            <Grid item xs={2}>
                                <Card key={index} className={styles.cartCard}>
                                    <CardMedia
                                    component="img"
                                    image={item.image.url}
                                    alt={item.name}
                                    />
                                </Card>
                            </Grid>
                            <Grid item xs={3} component={Stack} container direction="column" justifyContent="center">
                                <Typography variant="overline" display="block" gutterBottom style={{textAlign:'center'}}>
                                    {item.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} component={Stack} container direction="row" justifyContent="center">
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item xs={1} component={Stack} container direction="column" justifyContent="center">
                                        <IconButton aria-label="minus" style={{width:'fit-content'}}  onClick={removeProductFromCart}>
                                            <RemoveIcon/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={1} component={Stack} container direction="column" justifyContent="center">
                                        <Typography variant="button" display="block" gutterBottom style={{textAlign:'center'}}>
                                            {item.count}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} component={Stack} container direction="column" justifyContent="center">
                                        <IconButton aria-label="add" style={{width:'fit-content'}}  onClick={removeProductFromCart}>
                                            <AddIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} component={Stack}  container direction="column" justifyContent="center">
                                <Typography variant="overline" display="block" gutterBottom style={{textAlign:'center'}}>
                                    {moneyConvert(item.price_range.maximum_price.final_price.value)}
                                </Typography>
                                <Typography 
                                    variant="overline"
                                    display={item.price_range.maximum_price.final_price.value === item.price_range.maximum_price.regular_price.value ? "none": "block"}
                                    gutterBottom 
                                    style={{ textAlign:'center', textDecoration:'line-through'}}
                                >
                                    {moneyConvert(item.price_range.maximum_price.regular_price.value)}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} component={Stack} container direction="column" justifyContent="center">
                            <IconButton aria-label="delete" style={{width:'fit-content'}} onClick={removeProductFromCart}>
                                <DeleteIcon />
                            </IconButton>
                            </Grid>
                            <Grid item xs={1} component={Stack} container direction="column" justifyContent="center">
                            <Typography variant="h6" display="block" gutterBottom style={{textAlign:'center'}}>
                                {moneyConvert(item.price_range.maximum_price.final_price.value * item.count)}
                            </Typography>
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

