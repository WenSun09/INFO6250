function Loading({ className = 'loading', children = 'Loading...' }) {
    return (
        <p className={className}>{children}</p>
    );
}

export default Loading;