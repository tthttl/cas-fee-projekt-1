const Task = require('../models/task');

const dummyTasks = [
    {
        creationDate: '01-01-2020',
        deadline: '11-01-2020',
        isFinished: false,
        title: 'Finish Projekt 1',
        importance: 2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n'
            + 'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n'
            + 'ipsam laudantium minima molestias mollitia nesciunt omnis,\n'
            + 'quod sed sunt, vero voluptatibus! Veritatis!',
    },
    {
        creationDate: '02-01-2020',
        deadline: '10-01-2020',
        isFinished: false,
        title: 'Finish Projekt 2',
        importance: 3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n'
            + 'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n'
            + 'ipsam laudantium minima molestias mollitia nesciunt omnis,\n'
            + 'quod sed sunt, vero voluptatibus! Veritatis!',
    },
    {
        creationDate: '03-01-2020',
        deadline: '09-01-2020',
        isFinished: true,
        title: 'Get eggs',
        importance: 4,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n',
    },
    {
        creationDate: '04-01-2020',
        deadline: '08-01-2020',
        isFinished: true,
        title: 'Stay safe',
        importance: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n'
            + 'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n',
    },
    {
        creationDate: '05-01-2020',
        deadline: '07-01-2020',
        isFinished: false,
        title: 'Find my true self',
        importance: 0,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n'
            + 'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n'
            + 'ipsam laudantium minima molestias mollitia nesciunt omnis,\n'
            + 'quod sed sunt, vero voluptatibus! veritatis! \n'
            + 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n'
            + 'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n'
            + 'ipsam laudantium minima molestias mollitia nesciunt omnis,\n'
            + 'quod sed sunt, vero voluptatibus! veritatis!',
    },
];

async function initDB() {
    await Task.remove({});
    dummyTasks.forEach(async (task) => {
        try {
            await Task.create(task);
        } catch (e) {
            console.log(e);
        }
    });
}

module.exports = initDB;
