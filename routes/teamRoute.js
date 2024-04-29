import express from 'express';
import { Team } from '../models/teamsModel.js'; 

const router = express.Router();

// Route to save a new Team
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.members ||
            !request.body.project
        ) {
            return response.status(400).send({
                message: 'Missing required fields: name, members, project',
            });
        }
        const newTeam = {
            name: request.body.name,
            members: request.body.members,
            project: request.body.project
        };
        const team = await Team.create(newTeam);

        return response.status(201).send(team);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all Teams from database
router.get('/', async (request, response) => {
    try {
        const teams = await Team.find({});
        return response.status(200).json(teams);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a Team
router.put('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const updateData = {
            name: request.body.name,
            members: request.body.members,
            project: request.body.project
        };

        const result = await Team.findByIdAndUpdate(id, updateData, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Team not found' });
        }

        return response.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get one Team by ID
router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const team = await Team.findById(id);
        if (!team) {
            return response.status(404).send({ message: 'Team not found' });
        }
        return response.status(200).json(team);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a Team
router.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const result = await Team.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Team not found' });
        }

        return response.status(200).send({ message: 'Team deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
