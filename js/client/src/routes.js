import Admin from "./pages/Admin"
import { FLATPAGE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE,FLATS_ROUTE,ADMIN_ROUTE, FEEDBACK_ROUTE, NEWS_ROUTE  } from "./utils/consts"
import News from "./pages/News"
import Main from "./pages/Main"
import FlatPage from "./pages/FlatPage"
import Flats from "./pages/Flats"
import Auth from "./pages/Auth"
import Feedback from "./pages/Feedback"
export const authRoutes = [
    {
        path:ADMIN_ROUTE ,
        Component: Admin
    }
]
export const publicRoutes = [
    
        {
            path:MAIN_ROUTE ,
            Component: Main
        },
        {
            path:FLATPAGE_ROUTE +'/:id' ,
            Component: FlatPage
        },
        {
            path:FLATS_ROUTE ,
            Component: Flats
        },
        {
            path: LOGIN_ROUTE,
            Component: Auth
        },
        {
            path: REGISTRATION_ROUTE,
            Component: Auth
        },
        {
            path: FEEDBACK_ROUTE,
            Component: Feedback
        },
        {
            path: NEWS_ROUTE,
            Component: News
        }
    
]