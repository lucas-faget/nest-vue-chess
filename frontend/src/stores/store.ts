import { createStore } from 'vuex';
import type { PlayerColor } from '../chess/enums/PlayerColor';
import type { PieceName } from '../chess/enums/PieceName';

const store = createStore({
    getters: {
        getPieceImageSrc: () => (playerColor: PlayerColor, pieceName: PieceName) => {
            return `/assets/piece/${playerColor}/${pieceName}.svg`
        },
    }
});

export default store;
