import Contact from "../models/contactModel.mjs";

export const submitContactForm = async (req, res) => {
    try {
        const { firstName, lastName, email, subject, message } = req.body;

        // Validation des champs requis
        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validation de l'email
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Création du nouveau message
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            subject,
            message
        });

        // Sauvegarde du message
        await newContact.save();

        // Envoi de la réponse
        res.status(201).json({
            message: 'Message sent successfully',
            contact: newContact
        });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
};

export const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
};

export const deleteContactMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact message:', error);
        res.status(500).json({ error: 'Failed to delete message.' });
    }
};