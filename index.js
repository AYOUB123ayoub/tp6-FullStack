const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => { res.render('index', { user: 'med Ayoub ben abdallah' }); });

app.use(express.static('public'));

let tasks = [
    { id: 1, title: 'Apprendre Express', done: false },
    { id: 2, title: 'Créer une application de démonstration', done: false },
];

app.get('/api/tasks', (req, res) => res.json(tasks));





app.post('/api/tasks', (req, res) => {
    if (!req.body.title || req.body.title.trim() === '') {
        return res.status(400).json({
            error: 'TITLE_REQUIRED',
            message: 'Le titre de la tâche est obligatoire'
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title.trim(),
        done: false
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});
app.post('/api/tasks', (req, res) => {

    if (!req.body.title || req.body.title.trim() === '') {
        return res.status(400).json({
            error: 'TITLE_REQUIRED',
            message: 'Le titre de la tâche est obligatoire'
        });
    }

  
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title.trim(),
        done: false
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
    res.render('tasks', { 
        tasks: tasks,
        totalTasks: tasks.length, 
        completedTasks: tasks.filter(task => task.done).length, 
        pendingTasks: tasks.filter(task => !task.done).length 
    });
});



app.get('/contact', (req, res) => {
    res.render('contact', {
        email: 'ayoubba002@gmail.com',
        phone: '+123456'
    });
});


app.get('/profile', (req, res) => { 
    const user = { 
        name: 'John Doe', 
        age: 28, 
        occupation: 'Software Engineer', 
        hobbies: ['Coding', 'Gaming', 'Hiking'] 
    };
    res.render('profile', { user }); 
});

const courseInfo = {
    title: "Développement Web avec Express",
    description: "Ce cours couvre les fondamentaux du développement backend avec Node.js et Express.js",
    instructor: {
        name: "Jean Dupont",
        bio: "Développeur full-stack avec 10 ans d'expérience, spécialisé dans les technologies JavaScript.",
        expertise: ["Node.js", "Express", "React", "MongoDB"],
        email: "jean.dupont@example.com"
    },
    courseDetails: {
        duration: "8 semaines",
        level: "Débutant à Intermédiaire",
        price: "Gratuit"
    }
};

app.get("/api/about", (req, res) => {
    res.send({ courseInfo });
});

app.get('/about', (req, res) => {    
    res.render('about', { 
        title: 'À propos',
        courseInfo: courseInfo
    });
});

app.use((req, res, next, error) => {
    console.log(error);
});

app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`));