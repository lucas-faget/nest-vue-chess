import { ChessVariant } from '../../chess/types/ChessVariant';
import TwoPlayerGameView from '../../views/TwoPlayerGameView.vue'
import FourPlayerGameView from '../../views/FourPlayerGameView.vue'

export const routesPlayLocally = [
    {
        path: '/play',
        name: 'play',
        text: 'Standard',
        component: TwoPlayerGameView,
        props: {
            variant: ChessVariant.Standard
        }
    },
    {
        path: '/play/960',
        name: 'play-960',
        text: 'Fischer Random Chess',
        component: TwoPlayerGameView,
        props: {
			variant: ChessVariant.FischerRandom
		}
    },
    {
        path: '/play/fog',
        name: 'play-fog',
        text: 'Fog Of War Chess',
        component: TwoPlayerGameView,
        props: {
			variant: ChessVariant.FogOfWar
		}
    },
    {
        path: '/play/4player',
        name: 'play-4player',
        text: 'Four Player Chess',
        component: FourPlayerGameView,
        props: {
			variant: ChessVariant.FourPlayer
		}
    }
];
