import { ChessVariant } from '../../chess/enums/ChessVariant';
import PlayLocallyView from '../../views/PlayLocallyView.vue'

export const routesPlayLocally = [
    {
        path: '/play',
        name: 'play',
        text: 'Standard',
        component: PlayLocallyView,
        props: {
            variant: ChessVariant.Standard
        }
    },
    {
        path: '/play/960',
        name: 'play-960',
        text: 'Fischer Random Chess',
        component: PlayLocallyView,
        props: {
			variant: ChessVariant.FischerRandom
		}
    },
    {
        path: '/play/fog',
        name: 'play-fog',
        text: 'Fog Of War Chess',
        component: PlayLocallyView,
        props: {
			variant: ChessVariant.FogOfWar
		}
    },
    {
        path: '/play/4player',
        name: 'play-4player',
        text: 'Four Player Chess',
        component: PlayLocallyView,
        props: {
			variant: ChessVariant.FourPlayer
		}
    }
];
