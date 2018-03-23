const cards = [
    {
        type: 'projects',
        title: 'Projects Overview',
        subtitle: 'progress',
        progress: [
            {
                count: '58%',
                description: 'projectABC',
            },
            {
                count: '12%',
                description: 'projectDEF',
            },
            {
                count: '5%',
                description: 'project JKL',
            },
        ],
        backgroundImg: '/images/dashboard-img.png',
        subtitleColor: '#00ffc0',
        titleColor: '#f2f2f2',
        size: {
            col: 2,
            row: 2
        }
    },
    {
        type: 'projects',
        title: 'Project ABC',
        subtitle: 'dolor sit amet',
        content: [
            {
                count: 5,
                description: 'of this week',
            },
            {
                count: 2,
                description: 'overdue',
            },
            {
                description: '12/12/18'
            }
        ],
        progress: [
            {
                count: '2/3',
                description: 'modules',
            },
            {
                count: '2/3',
                description: 'tasks',
            },
            {
                count: '2/3',
                description: 'project progress',
            },
        ],
        team: [
            'user',
            'user',
            'user',
            'user',
            'user',
        ],
        subtitleColor: '#8a2be0',
        size: {
            col: 2,
            row: 2
        }
    },
    {
        type: 'tasks_due',
        title: 'Tasks Due',
        subtitle: 'today',
        progress: [
            {
                count: 12,
                description: 'all tasks',
            },
            {
                count: 1,
                description: 'your tasks',
            },
        ],
        subtitleColor: '#0093f6',

        size: {
            col: 1,
            row: 1
        }
    },
    {
        type: 'tasks_due',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        days: [
                {
                    day: 'Today', 
                    data: ['sample task 1', 'sample task 2', 'sample task 3']
                },
                {
                    day: 'Tomorrow', 
                    data: ['sample task 1', 'sample task 2654', 'sample task 1233']
                },
                {
                    day: 'Current', 
                    data: ['sample task 1', 'sample task 278989', 'sample task 87993']
                },
            ],
        
        subtitleColor: '#0093f6',
        size: {
            col: 1,
            row: 4
        }
    },
    {
        type: 'tasks',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        progress: [
            {
                count: '2/3',
                description: 'modules',
            },
            {
                count: '2/3',
                description: 'tasks',
            },
            {
                count: '2/3',
                description: 'project progress',
            },
        ],
        subtitleColor: '#0093f6',
        size: {
            col: 1,
            row: 1
        }
    },
    {
        type: 'other',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        subtitleColor: '#fff',
        background: '#00ffc0',
        backgroundImg: '/images/dashboardImg2.png',
        size: {
            col: 2,
            row: 2
        }
    },
    {
        type: 'tasks',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        progress: [
            {
                count: '2/3',
                description: 'modules',
            },
            {
                count: '2/3',
                description: 'tasks',
            },
        ],
        subtitleColor: '#fff',
        background: '#00ffc0',
        size: {
            col: 1,
            row: 1
        }
    },
    {
        type: 'other',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        subtitleColor: '#fff',
        background: '#00ffc0',
        backgroundImg: '/images/dashboardImg3.png',
        size: {
            col: 2,
            row: 2
        }
    },
    {
        type: 'tasks',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        progress: [
            {
                count: '2/3',
                description: 'tasks',
            },
            {
                count: '2/3',
                description: 'project progress',
            },
        ],
        subtitleColor: '#fff',
        background: '#00ffc0',
        size: {
            col: 1,
            row: 1
        }
    },
    {
        type: 'tasks',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        progress: [
            {
                count: '2/3',
                description: 'modules',
            },
            {
                count: '2/3',
                description: 'tasks',
            },
            {
                count: '2/3',
                description: 'project progress',
            },
        ],
        subtitleColor: '#fff',
        background: '#00ffc0',
        size: {
            col: 1,
            row: 1
        }
    },
    {
        type: 'tasks',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        progress: [
            {
                count: '2/3',
                description: 'project progress',
            },
        ],
        subtitleColor: '#fff',
        background: '#00ffc0',
        size: {
            col: 1,
            row: 1
        }
    },
    {
        type: 'tasks',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        subtitleColor: '#ccc',
        background: '#f2f2f2',
        size: {
            col: 1,
            row: 1
        }
    },
    {
        type: 'tasks',
        title: 'lorem ipsum',
        subtitle: 'dolor sit amet',
        progress: [
            {
                count: '2/3',
                description: 'modules',
            },
            {
                count: '2/3',
                description: 'tasks',
            },
            {
                count: '2/3',
                description: 'project progress',
            },
        ],
        subtitleColor: '#fff',
        background: '#00ffc0',
        size: {
            col: 1,
            row: 1
        }
    },    
];

export default cards;