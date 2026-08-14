import mongoose, { Schema, Document } from 'mongoose';

export interface OrderType extends Document {
    userId: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: string;
    createdAt: Date;
}

const OrderSchema = new Schema<OrderType>({
    userId: { type: String, required: true },
    items: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
    },
    { collection: 'orders'}
);

export default mongoose.models.Order || mongoose.model<OrderType>('Order', OrderSchema);