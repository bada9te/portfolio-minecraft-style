export default function Page() {
    return (
        <div className="w-screen h-screen z-50">
            <iframe
                src="https://portfolio.bada9te.dev"
                className="w-full h-full"
                style={{ border: "none" }}
                title="External Site"
            />
        </div>
    );
}