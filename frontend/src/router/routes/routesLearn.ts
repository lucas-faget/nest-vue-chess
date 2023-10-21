import LearnPiecesView from '../../views/LearnPiecesView.vue'
import LearnOpeningsView from '../../views/LearnOpeningsView.vue'

export const routesLearn = [
    {
        path: '/learn/pieces',
        name: 'learn-pieces',
        text: 'Pieces',
        component: LearnPiecesView
    },
    {
        path: '/learn/openings',
        name: 'learn-openings',
        text: 'Openings',
        component: LearnOpeningsView
    }
];
