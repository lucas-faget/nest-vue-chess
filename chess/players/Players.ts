import { Direction } from "../coordinates/Direction";
import { PlayerColor } from "../enums/PlayerColor";
import { Player } from "./Player";

export const Whites = new Player(PlayerColor.White, "Whites", Direction.Up);
export const Blacks = new Player(PlayerColor.Black, "Blacks", Direction.Down);
export const Silvers = new Player(PlayerColor.Silver, "Silvers", Direction.Right);
export const Golds = new Player(PlayerColor.Gold, "Golds", Direction.Left);
