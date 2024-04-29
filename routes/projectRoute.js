import express from 'express';
import { Project } from '../models/projectModel.js'; // Ensure you have a Project model as defined earlier

const router = express.Router();

// Route to save a new Project
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.description ||
            !request.body.budget ||
            !request.body.status
        ) {
            return response.status(400).send({
                message: 'Missing required fields: name, description, budget, status',
            });
        }
        const newProject = {
            name: request.body.name,
            description: request.body.description,
            budget: request.body.budget,
            status: request.body.status,
        };
        const project = await Project.create(newProject);

        return response.status(201).send(project);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all projects from database
router.get('/', async (request, response) => {
    try {
        const projects = await Project.find({});
        return response.status(200).json({
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a project
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.description ||
            !request.body.budget ||
            !request.body.status
        ) {
            return response.status(400).send({
                message: 'Missing required fields: name, description, budget, status',
            });
        }

        const id = request.params.id;
        const updateData = {
            name: request.body.name,
            description: request.body.description,
            budget: request.body.budget,
            status: request.body.status,
        };

        const result = await Project.findByIdAndUpdate(id, updateData, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Project not found' });
        }

        return response.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get one project from the database by ID
router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const project = await Project.findById(id);
        if (!project) {
            return response.status(404).send({ message: 'Project not found' });
        }
        return response.status(200).json(project);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a project
router.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const result = await Project.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Project not found' });
        }

        return response.status(200).send({ message: 'Project deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
