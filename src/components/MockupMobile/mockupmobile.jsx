import "./mockup.css";

export default function MockupMobile({
    bgMobile,
    bgTablet,
    bgDesktop,
}) {
    const style = {
        "--bg-mobile": bgMobile ? `url(${bgMobile})` : undefined,
        "--bg-tablet": (bgTablet || bgMobile) ? `url(${bgTablet || bgMobile})` : undefined,
        "--bg-desktop": (bgDesktop || bgTablet || bgMobile) ? `url(${bgDesktop || bgTablet || bgMobile})` : undefined,
    };

    return (
        <div className="iphone-x" style={style}>
        </div>
    );
}