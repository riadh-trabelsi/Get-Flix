import express from 'express'
import { submitContactForm, getContactMessages, deleteContactMessage } from '../controllers/contactController.mjs'

const contactRoutes = express.Router()

contactRoutes.post('/submit', submitContactForm)
contactRoutes.get('/messages', getContactMessages)
contactRoutes.delete('/messages/:id', deleteContactMessage)

export default contactRoutes 