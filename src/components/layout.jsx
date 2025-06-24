import { NavBar } from './navbar.jsx'
import { Outlet } from 'react-router-dom';
import "./components.css"

export function Layout() {
  return (
    <div className='layout'>
      <Title />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export function Title()
{
  return (
    <h1 className='title'>InFocus</h1>
  );
}