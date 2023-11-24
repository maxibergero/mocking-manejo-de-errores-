import { ticketModel } from "../models/tickets.models.js";

export const generarTicket = async (req, res) => {

    const generateUniqueCode = (purchase_datatime) => {

        //Genarando STRING 
        const year = purchase_datatime.getFullYear();
        const month = (purchase_datatime.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
        const day = purchase_datatime.getDate().toString().padStart(2, '0');
        const hour = purchase_datatime.getHours().toString().padStart(2, '0');
        const minutes = purchase_datatime.getMinutes().toString().padStart(2, '0');
        const seconds = purchase_datatime.getSeconds().toString().padStart(2, '0');
        const stringRes = `${year}${month}${day}${hour}${minutes}${seconds}`;

        return stringRes
    }


    try {
        const user = req.user.user

        const purcharser = user.email

        const arrayCart = user.cart.products

        let total = 0

        arrayCart.forEach(product => {
            total += product.quantity * product.id_prod.price
        });

        const amount = total

        const purchase_datatime = new Date();
        // Generar un código único, por ejemplo, usando un paquete como 'shortid'
        const uniqueCode = generateUniqueCode(purchase_datatime);

        // Asignar el código generado al campo 'code'
        const code = uniqueCode;

        const ticket = await ticketModel.create({ purcharser, purchase_datatime, code, amount })


        if (ticket) {
            res.status(200).send(ticket)
        } else {
            res.status(400).send("Error al crear ticket")
        }
    } catch (error) {
        throw new Error(error)
    }




}