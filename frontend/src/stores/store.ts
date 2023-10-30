import { createStore } from 'vuex';
import { PlayerColor } from '../chess/types/PlayerColor';
import type { PieceName } from '../chess/types/PieceName';

const store = createStore({
    getters: {
        fullLetterColor: () => (playerColor: PlayerColor) => {
            switch (playerColor) {
                case PlayerColor.White:
                    return "white";
                case PlayerColor.Black:
                    return "black";
                case PlayerColor.Silver:
                    return "silver";
                case PlayerColor.Gold:
                    return "gold";
            }
        },
        getPieceImageSrc: () => (playerColor: PlayerColor, pieceName: PieceName) => {
            return `/assets/piece/${store.getters.fullLetterColor(playerColor)}/${pieceName}.svg`
        },
    }
});

export default store;
