import { ChessVariant } from '../../../../chess/enums/ChessVariant';
import PlayOnlineView from '../../views/PlayOnlineView.vue'

export const routesOnline = [
    {
        path: '/online',
        name: 'online',
        text: 'Standard',
        component: PlayOnlineView,
        props: {
            variant: ChessVariant.Standard
        }
    }
];
