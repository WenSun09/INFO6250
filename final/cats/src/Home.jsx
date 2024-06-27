import './Home.css';

function Home({ setPage }) {
    return (
        <div className="panels">
            <div className="panel panel1">
                <img src="placekitten1.jpg" alt="Adopt a cat" className="panel__pic panel1-pic" />
                <h2 className="panel__title panel1-title">Adopt a Cat Today!</h2>
                <p className="panel__content panel1-content1">
                    We are a nonprofit organization that provides cat adoption services.
                </p>
                <p className="panel__content panel1-content2">
                    We rescue stray cats throughout California and help them find adopters.
                </p>
                <p className="panel__content panel1-content3">
                    You can choose the cat you want to adopt in the { }
                    <a href='/cats.html' onClick={(e) => { e.preventDefault(); setPage("Adoptable cats"); }}>Adoptable cats</a>. Or see more cats adoption records in the { }
                    <a href='/records.html' onClick={(e) => { e.preventDefault(); setPage("Adoption Records"); }}>Adoption Records</a>.
                </p>

            </div>
            <div className="panel panel2">
                <img src="placekitten3.jpg" alt="reasons" className="panel__pic panel2-pic" />
                <h2 className="panel__title panel2-title">Reasons to Adopt a Cat</h2>
                <p className="panel__content panel2-content1">
                    1. You’ll save more than one life by adopting a cat.
                </p>
                <p className="panel__content panel2-content2">
                    2. It makes good financial sense to adopt a cat.
                </p>
                <p className="panel__content panel2-content3">
                    3. The personality of an adopted cat is known.
                </p>
            </div>
        </div>
    );
}

export default Home;