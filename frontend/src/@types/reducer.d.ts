import { rootReducer } from '../redux/store'

declare global {
    type RootState = ReturnType<typeof rootReducer>;
}