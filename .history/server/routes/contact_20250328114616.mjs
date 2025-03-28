import express from 'express'
import ContactModel from '../models/contactModel.mjs'

const contactRoutes = express.Router()

contactRoutes.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body

    // Validation des champs requis
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Validation de l'email
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Création du nouveau message
    const newContact = new ContactModel({
      firstName,
      lastName,
      email,
      subject,
      message
    })

    // Sauvegarde du message
    await newContact.save()

    // Envoi de la réponse
    res.status(201).json({
      message: 'Message sent successfully',
      contact: newContact
    })
  } catch (error) {
    console.error('Error saving contact message:', error)
    res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
})

export default contactRoutes 