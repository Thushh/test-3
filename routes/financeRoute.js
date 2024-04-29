import express from 'express';
import { Finance } from '../models/financeModel.js'; 
import { Project } from '../models/projectModel.js'; 

const router = express.Router();

// Route to save a new Finance entry
router.post('/', async (request, response) => {
    try {
        const { project, amount, type, description, date } = request.body;

        if (!project || !amount || !type) {
            return response.status(400).send({
                message: 'Missing required fields: project, amount, type',
            });
        }

        // Check if the referenced project exists
        const existingProject = await Project.findById(project);
        if (!existingProject) {
            return response.status(404).send({ message: 'Project not found' });
        }

        const newFinance = new Finance({
            project,
            amount,
            type,
            description, 
            date: date || Date.now() 
        });

        const savedFinance = await newFinance.save();
        return response.status(201).send(savedFinance);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all Finance entries from database
router.get('/', async (request, response) => {
    try {
        const finances = await Finance.find({}).populate('project', 'name'); // Populating project name
        return response.status(200).json(finances);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a Finance entry
router.put('/:id', async (request, response) => {
    try {
        const { project, amount, type, description, date } = request.body;
        const id = request.params.id;

        // Ensure the project exists if changing the project reference
        if (project) {
            const existingProject = await Project.findById(project);
            if (!existingProject) {
                return response.status(404).send({ message: 'Project not found' });
            }
        }

        const updateData = { project, amount, type, description, date };
        const result = await Finance.findByIdAndUpdate(id, updateData, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Finance entry not found' });
        }

        return response.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get one Finance entry from the database by ID
router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const finance = await Finance.findById(id).populate('project', 'name'); // Populating project name
        if (!finance) {
            return response.status(404).send({ message: 'Finance entry not found' });
        }
        return response.status(200).json(finance);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a Finance entry
router.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const result = await Finance.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Finance entry not found' });
        }

        return response.status(200).send({ message: 'Finance entry deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
