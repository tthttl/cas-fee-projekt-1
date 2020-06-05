export default class TaskService {

    dummyTasks = [
        {
            id: '1',
            creationDate: '01-01-2020',
            deadline: '11-01-2020',
            isFinished: false,
            title: 'Finish Projekt 1',
            importance: 2,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n' +
                'ipsam laudantium minima molestias mollitia nesciunt omnis,\n' +
                'quod sed sunt, vero voluptatibus! Veritatis!'
        },
        {
            id: '2',
            creationDate: '02-01-2020',
            deadline: '10-01-2020',
            isFinished: false,
            title: 'Finish Projekt 2',
            importance: 3,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n' +
                'ipsam laudantium minima molestias mollitia nesciunt omnis,\n' +
                'quod sed sunt, vero voluptatibus! Veritatis!'
        },
        {
            id: '3',
            creationDate: '03-01-2020',
            deadline: '09-01-2020',
            isFinished: true,
            title: 'Get eggs',
            importance: 4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n'
        },
        {
            id: '4',
            creationDate: '04-01-2020',
            deadline: '08-01-2020',
            isFinished: true,
            title: 'Stay safe',
            importance: 1,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n'
        },
        {
            id: '5',
            creationDate: '05-01-2020',
            deadline: '07-01-2020',
            isFinished: false,
            title: 'Find my true self',
            importance: 0,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n' +
                'ipsam laudantium minima molestias mollitia nesciunt omnis,\n' +
                'quod sed sunt, vero voluptatibus! veritatis! \n' +
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n' +
                'ipsam laudantium minima molestias mollitia nesciunt omnis,\n' +
                'quod sed sunt, vero voluptatibus! veritatis!'
        }
    ];

    constructor(httpService) {
        this.httpService = httpService;
    }

    findAll() {
        return Promise.resolve(this.dummyTasks);
    }

    findById(id) {
        return Promise.resolve(this.dummyTasks.find((task) => task.id === id));
    }

    save(task){
        task.id = this.dummyTasks.length + 1 + '';
        this.dummyTasks.push(task);
    }

    update(taskToUpdate){
        const index = this.dummyTasks.findIndex((task) => task.id === taskToUpdate.id);
        this.dummyTasks.splice(index, 1, taskToUpdate);
    }
}
