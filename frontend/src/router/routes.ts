import { routesPlay } from './routes/routesPlay'
import { routesRoom } from './routes/routesRoom';
import { routesLearn } from './routes/routesLearn'

export const routes = [
    ...routesPlay,
    ...routesRoom,
    ...routesLearn
];
