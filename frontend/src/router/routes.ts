import { routesPlayLocally } from './routes/routesPlayLocally'
import { routesPrivateGame } from './routes/routesPrivateGame';
import { routesLearn } from './routes/routesLearn'

export const routes = [
    ...routesPlayLocally,
    ...routesPrivateGame,
    ...routesLearn
];
