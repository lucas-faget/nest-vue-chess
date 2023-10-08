import { routesPlay } from './routes/routesPlay'
import { routesOnline } from './routes/routesOnline';
import { routesLearn } from './routes/routesLearn'

export const routes = [
    ...routesPlay,
    ...routesOnline,
    ...routesLearn
];
