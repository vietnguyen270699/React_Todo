export default function Button({ color, children, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: color }}
            className="btn"
        >
            {children}
        </button>
    )
}
