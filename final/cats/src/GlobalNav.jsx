import './GlobalNav.css';
import menu from './menu'

function GlobalNav({ className, setPage }) {
    const list = menu.map(item => {
        return (
            <li className="global-nav__item" key={item.name}>
                <a
                    className="global-nav__link"
                    href={item.path}
                    onClick={(e) => {
                        e.preventDefault()
                        setPage(item.name);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Space") {
                            e.preventDefault()
                            setPage(item.name);
                        }
                    }}
                >{item.name}
                </a>
            </li>
        );
    });
    return (
        <nav className={`global-nav ${className}`}>
            <ul className="global-nav__list">
                {list}
            </ul>
        </nav>
    );
}


export default GlobalNav;