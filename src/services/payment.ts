import { Request, Response } from 'express';
import crypto from 'crypto';
import { generateTransactionId } from '../utils/generateTransactionId';
import { ProductTable, UserTable } from '../relation';
import { validatePayload } from '../helper/payloadValidation';

const { MERCHANT_KEY , MERCHANT_SALT } = process.env

async function _generateHashForPaymentService(req: Request, res: Response) {
    try {
        const { customer_id, product_id } = req.body;

        const requiredFields = ["customer_id", "product_id"];
        validatePayload(req.body, requiredFields);

        const customer :any = await UserTable.findByPk(customer_id);
        if (!customer) {
            throw new Error('Customer not found')
        }

        const product:any = await ProductTable.findByPk(product_id);
        if (!product) {
            throw new Error('Product not found')
        }

        const txnid = generateTransactionId(10);

        const data = {
            key : MERCHANT_KEY,
            salt : MERCHANT_SALT,
            txnid ,
            amount : product.price, 
            productInfo : product.product_title, 
            first_name : customer.first_name, 
            email : customer.email
        }
        const crypt = crypto.createHash('sha512')
        const string = data.key + '|' + data.txnid + '|' +data.amount + '|' + data.productInfo + '|' + data.first_name + '|' + data.email + '|' +'||||||||||' + data.salt;
        crypt.update(string)
        const hash = crypt.digest('hex')

        return {
            data: hash,
            message: 'Hash Generated successfully'
        };
    } catch (error) {
        console.error('Error in _generateHashForPayment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export { _generateHashForPaymentService };
