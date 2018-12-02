import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Lesson from './models/lesson'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/lessons', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB ready');
})

router.route('/lessons').get((req, res) => {
    Lesson.find((err, lessons) => {
        if (err)
            console.log(err);
        else
            res.json(lessons);
    });
});

router.route('/lessons/:id').get((req, res) => {
    Lesson.findById(req.params.id), (err, lesson) => {
        if (err)
            console.log(err);
        else
            res.json(lesson);
    };
});

router.route('/lessons/add').post((req, res) => {
    let lesson = new Lesson(req.body);
    lesson.save().then(lesson => {
            res.status(200).json({'lesson': 'New lesson available'});
        })
        .catch(err => {
            res.status(400).send('It is not working');
        });
});

router.route('/lessons/update/:id').post((req, res) => {
    Lesson.findById(req.params.id), (err, lesson) => {
        if (!lesson)
            return next(new Error('It is dead'));
        else {
            lesson.title = req.body.title;
            lesson.description = req.body.description; 
            lesson.department = req.body.department; 
            lesson.hours = req.body.hours; 
            lesson.targetlanguage = req.body.targetlanguage; 
            lesson.boxlink = req.body.boxlink; 

            lesson.save().then(lesson => {
                res.json('Updated');
            }).catch(err => {
                res.status(400).send('Failed');
            });
        }
    };
});

router.route('/lessons/delete/:id').get((req, res) => {
    Lesson.findByIdAndRemove({_id: req.params.id}, (err, lesson) => {
        if (err)
            res.json(err);
        else
            res.json('Removed');
    })
})

app.use('/', router);

app.listen(4000, () => console.log('Express on 4000'));