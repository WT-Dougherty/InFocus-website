import "./components.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function NavBar()
{
  useEffect(() => {
    const links = document.querySelectorAll('.navitem');

    function blurOtherLinks(activeLink) {
      links.forEach(link => {
        if (link !== activeLink) {
          link.style.filter = 'blur(2px)';
        }
      });
    }

    function clearAllBlurs() {
      links.forEach(link => {
        link.style.filter = 'none';
      });
    }

    function handleLink(link) {
      link.addEventListener('mouseenter', () => blurOtherLinks(link));
      link.addEventListener('mouseleave', clearAllBlurs);
    }

    links.forEach(handleLink);

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', () => blurOtherLinks(link));
        link.removeEventListener('mouseleave', clearAllBlurs);
      });
    };
  }, []);

  return (
    <nav className='navbar'>
      <Link className="navitem" to={'/projects'}>
        Projects
      </Link>
      <Link className="navitem" to={'/'}>
        About
      </Link>
      <Link className="navitem" to={'/writeups'}>
        Writeups
      </Link>
    </nav>
  );
}