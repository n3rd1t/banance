import { Route, Routes } from 'react-router-dom'
import { Header } from '../Header/Header';
import { Home } from '../../pages/Home/Home';

export const AppRouter = () => (
    <main>
        <Routes>
            <Route path='/' element={<Header/>}>
                <Route index element={<Home/>} />
                <Route path='test' element={<div>test</div>} />
                <Route path='*' element={<div>404</div>} />
            </Route>
        </Routes>
    </main>
)