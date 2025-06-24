import "./components.css"

export function SocialLinks() {
    return (
        <footer>
            <a href="https://www.linkedin.com/in/will-t-dougherty/" target="_blank" className="socials">
                <img src="LinkedIn-Logo.png" alt="LinkedIn" width="40" height="40" className="socials"></img>
            </a>
            <a href="https://github.com/WT-Dougherty" target="_blank" className="socials">
                <img src="https://cdn.simpleicons.org/github/FFFFFF" alt="GitHub" width="40" height="40" className="socials"></img>
            </a>
        </footer>
    );
}

export function Footer() {
    return (
        <footer>
            <p>&copy; Will Dougherty, 2025</p>
        </footer>
    );
}