import express from 'express';
import { Target } from '../models/targetsModel.js'; 

const router = express.Router();

// Route to save a new Target
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.project ||
            !request.body.description ||
            !request.body.dueDate ||
            !request.body.status
        ) {
            return response.status(400).send({
                message: 'Missing required fields: project, description, dueDate, status',
            });
        }
        const newTarget = {
            project: request.body.project,
            description: request.body.description,
            dueDate: request.body.dueDate,
            status: request.body.status
        };
        const target = await Target.create(newTarget);

        return response.status(201).send(target);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all Targets from database
router.get('/', async (request, response) => {
    try {
        const targets = await Target.find({});
        return response.status(200).json(targets);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a Target
router.put('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const updateData = {
            project: request.body.project,
            description: request.body.description,
            dueDate: request.body.dueDate,
            status: request.body.status
        };

        const result = await Target.findByIdAndUpdate(id, updateData, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Target not found' });
        }

        return response.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get one Target by ID
router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const target = await Target.findById(id);
        if (!target) {
            return response.status(404).send({ message: 'Target not found' });
        }
        return response.status(200).json(target);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a Target
router.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const result = await Target.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Target not found' });
        }

        return response.status(200).send({ message: 'Target deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
