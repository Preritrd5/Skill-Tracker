import Navbar from "./Navbar";

const PublicLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="pt-10">
                {children}
            </div>
        </>
    );
};

export default PublicLayout;
