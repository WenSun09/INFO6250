import GlobalNav from './GlobalNav';
import './Footer.css'

function Footer({ setPage }) {
    return (
        <footer className="footer">
            <GlobalNav className="footer__nav" setPage={setPage} />
        </footer>
    );
}

export default Footer;