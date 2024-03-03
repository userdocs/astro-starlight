
export default function Details({ children }) {

    console.log(children);

    return (
        <>
            <hr />
            <details className="custom-details">
                <summary className="custom-summary">What to expect</summary>
                <div className="custom-content">
                    {children}
                </div>
            </details>
        </>
    );
}