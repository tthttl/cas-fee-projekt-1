const dummyTasks = {
    tasks: [
        {
            deadline: '28-06-2020',
            isFinished: false,
            title: 'Finish Projekt 1',
            importance: 2,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n' +
                'ipsam laudantium minima molestias mollitia nesciunt omnis,\n' +
                'quod sed sunt, vero voluptatibus! Veritatis!'
        },
        {
            deadline: '28-07-2020',
            isFinished: false,
            title: 'Finish Projekt 2',
            importance: 3,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n' +
                'ipsam laudantium minima molestias mollitia nesciunt omnis,\n' +
                'quod sed sunt, vero voluptatibus! Veritatis!'
        },
        {
            deadline: '28-08-2020',
            isFinished: true,
            title: 'Get eggs',
            importance: 4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n'
        },
        {
            deadline: '28-09-2020',
            isFinished: true,
            title: 'Stay safe',
            importance: 1,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                'Architecto consequatur cum ea eligendi eos esse eveniet ipsa\n'
        },
        {
            deadline: '28-10-2020',
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
    ]
}

function initTaskBox() {
    const taskItemTemplate = document.querySelector('#task-item-template');
    const taskItemTemplateFunction = Handlebars.compile(taskItemTemplate.innerHTML);
    document.querySelector('.task-box').innerHTML = taskItemTemplateFunction(dummyTasks);
}

initTaskBox();
