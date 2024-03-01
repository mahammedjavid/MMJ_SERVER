import { Request, Response } from 'express';
import crypto from 'crypto';
import { generateTransactionId } from '../utils/generateTransactionId';
import { AddressTable, OrderItemTable, OrderTable, ProductTable, UserTable } from '../relation';
import { validatePayload } from '../helper/payloadValidation';
import { generateHash } from '../utils/crypto';

const { MERCHANT_KEY , MERCHANT_SALT  } = process.env

async function _generateHashForPaymentService(req: Request, res: Response) {
    try {
        const { customer_id, order_id } = req.body;

        const requiredFields = ["customer_id", "order_id"];
        validatePayload(req.body, requiredFields);

        const customer: any = await UserTable.findByPk(customer_id);
        if (!customer) {
            throw new Error('Customer not found')
        }

        const order: any = await OrderTable.findOne({
            where: {
                order_id,
            },
            include: [
                {
                    model: OrderItemTable,
                    include: [
                        { model: ProductTable }
                    ]
                },
                UserTable,
                AddressTable
            ]
        })
        if (!order) {
            throw new Error('Order not found')
        }

        const txnid = generateTransactionId(10);

        const data = {
            key: MERCHANT_KEY,
            salt: MERCHANT_SALT,
            txnid,
            amount: order.total_price,
            productInfo: order.orderItems.map((ord: any) => ord.product.product_title)?.toString(),
            first_name: customer.first_name,
            email: customer.email
        }

        const crypt = crypto.createHash('sha512')
        const string = data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productInfo + '|' + data.first_name + '|' + data.email + '|' + '||||||||||' + data.salt;
        crypt.update(string)
        const hash = crypt.digest('hex')

        return {
            data: hash,
            message: 'Hash Generated successfully'
        };
    } catch (error) {
        console.error('Error in _generateHashForPayment:', error);
        throw error
    }
}

async function _paymentService(req: Request, res: Response) {
    try {
        const { customer_id, order_id } = req.body;

        const requiredFields = ["customer_id", "order_id"];
        validatePayload(req.body, requiredFields);

        const customer: any = await UserTable.findByPk(customer_id);
        if (!customer) {
            throw new Error('Customer not found');
        }

        const order: any = await OrderTable.findOne({
            where: { order_id },
            include: [
                {
                    model: OrderItemTable,
                    include: [{ model: ProductTable }]
                },
                UserTable,
                AddressTable
            ]
        });
        if (!order) {
            throw new Error('Order not found!');
        }

        const apiEndPoint = 'https://secure.payu.in/_payment';
        const txnid = generateTransactionId(10);
        const salt = MERCHANT_SALT;

        const params: any = {
            key: MERCHANT_KEY,
            txnid,
            amount: order.total_price,
            productinfo: order.orderItems.map((ord: any) => ord.product.product_title).join(', '),
            firstname: customer.first_name,
            email: customer.email,
            phone: customer.mobile_number,
            surl: 'http://localhost:4321/api/payment-gateway/success',
            furl: 'http://localhost:4321/api/payment-gateway/failure',
            // udf1: order_id
        };

        const hash = generateHash(params, salt);
        params.hash = hash;

        const encodedParams = new URLSearchParams(params).toString();
        const url = `${apiEndPoint}?${encodedParams}`;

        return {
            data: url,
            message: 'Payment URL generated Successfully'
        };
    } catch (error) {
        console.error('Error in _paymentService:', error);
        throw error;
    }
}

async function _handleFailedPaymentService(req: Request, res: Response) {
    try {
        const failedData = req.body
        console.log("failedData",failedData)

        return {
            data: '',
            message: "Payment failed"
        };
    } catch (error) {
        console.error("Error in _handleFailedPaymentService:", error);
        throw error;
    }
}

async function _handleSuccessPaymentService(req: Request, res: Response) {
    try {
        const successData = req.body
        console.log("successData",successData)
        return {
            data: '',
            message: "Payment is Successfull"
        };
    } catch (error) {
        console.error("Error in _handleSuccessPaymentService:", error);
        throw error;
    }
}

export { _generateHashForPaymentService, _handleFailedPaymentService, _handleSuccessPaymentService,_paymentService };