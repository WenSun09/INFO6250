import Loading from './Loading';

function Word({
    storedWord,
    isWordPending,
}) {
    const SHOW = {
        PENDING: 'pending',
        WORD: 'word',
    };

    let show;
    if (isWordPending) {
        show = SHOW.PENDING;
    } else {
        show = SHOW.WORD;
    }

    return (
        <div className="content">
            {show === SHOW.PENDING && <Loading className="word__waiting">Loading Word...</Loading>}
            {show === SHOW.WORD && (
                <p>Your Word is: {storedWord}</p>
            )}
        </div>
    );
}

export default Word;
