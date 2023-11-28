import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    purchase_datatime: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    purcharser: {
        type: String,
        required: true
    }
}
)



ticketSchema.pre('findOne', function () {
    this.populate('carts.id_prod')
})

export const ticketModel = model('ticket', ticketSchema)