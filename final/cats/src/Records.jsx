import './Records.css';

function Records({ storedCats }) {
    const list = storedCats.catsRecords.map((record) => {
        return (
            <div className="record" key={record}>
                <p className="record__content" >{record}</p>
            </div>
        );
    });
    return (
        <div className="records">
            {list}
        </div>
    );
}

export default Records;