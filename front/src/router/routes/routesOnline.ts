import PlayOnlineView from '@/views/PlayOnlineView.vue'
import { ChessVariant } from '@/enums/ChessVariant';

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
