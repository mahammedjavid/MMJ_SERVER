import express, { Request, Response } from 'express';
import userRoutes from '../controller/customer';
import productRoute from '../controller/product';
import cartRoute from '../controller/cart';
import wishListRoute from '../controller/wishList';
import categoryRoutes from '../controller/category';
import BulkResponceRoute from '../controller/bulkUploadResponce';
import reviewRoute from '../controller/review'
import addressRoute from '../controller/address'
import orderRoute from '../controller/order'

import { verifyAccessToken } from '../helper/jwtToken'; // used passport for route authorization
// import { passPOrtAuth } from '../helper/passportAuth';
// import passport from 'passport';

const app = express();
// passPOrtAuth(passport)
// passport.authenticate('jwt',{session:false}) //add this middleware to authenticate route
app.get('/', (req:Request, res:Response) => {
    res.send('Welcome to MMJ Server!');
});
app.use("/user", userRoutes);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/wish-list", wishListRoute);
app.use('/categories', categoryRoutes);
app.use('/bulk-responce', BulkResponceRoute);
app.use("/reviews",reviewRoute)
app.use("/address",addressRoute)
app.use("/order",orderRoute)

export default app;