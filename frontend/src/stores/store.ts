import { createStore } from 'vuex';
import type { PlayerColor } from '../chess/types/PlayerColor';
import type { PieceName } from '../chess/types/PieceName';

const store = createStore({
    getters: {
        getPieceImageSrc: () => (playerColor: PlayerColor, pieceName: PieceName) => {
            return `/assets/piece/${playerColor}/${pieceName}.svg`
        },
    }
});

export default store;
