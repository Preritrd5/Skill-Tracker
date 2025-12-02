import Navbar from "../layout/Navbar"; 
const ProtectedLayout = ({ children }) => (
    <>
        <Navbar />
        <div className="">{children}</div>
    </>
);
export default ProtectedLayout;
