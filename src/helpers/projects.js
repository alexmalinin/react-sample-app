export default {
    lanes: [
        {
            id: 'lane1',
            title: 'Backlog',
            cards: [
                {
                    id: 'Card1', 
                    title: 'Build Client’s Dashboard',
                    description: 'Platform - Dashboard', 
                    descriptionColor: '#8f1ae5',
                    DDTW: '35'
                },
                {
                    id: 'Card2', 
                    title: 'Build Organisation Tab',
                    DDTW: '36'
                },
                {
                    id: 'Card3', 
                    title: 'Info required for the organisation',
                    DDTW: '38'
                }
            ]
        },
        {
            id: 'lane2',
            title: 'In progress',
            cards: [
                {
                    id: 'Card4', 
                    title: 'Epic: Specialists WIP Tasks / Projects',
                    description: 'Platform - Specialists',
                    descriptionColor: '#5366e5',
                    DDTW: '22'
                }
            ]
        },
        {
            id: 'lane3',
            title: 'Complete',
            cards: [
                {
                    id: 'Card5', 
                    title: 'Epic: The Village Playground',
                    description: 'Platform - Networks UI',
                    descriptionColor: '#38b7bf',
                    DDTW: '17'
                },
                {
                    id: 'Card6', 
                    title: 'Epic: Platform Admin & Super User', 
                    description: 'Platform - Control room',
                    descriptionColor: '#29abe2',
                    DDTW: '18'
                }
            ]
        }
    ]
}