import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Modal from '@mui/material/Modal'; // Ensure Modal is imported
import Cart from '../screen/cart'; // Ensure Cart component is imported
import '../Model'
import { useCart } from './ContextReducer';
export default function Navbar(props) {
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    let data = useCart() || [];
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };
    const loadCart = () => {
        setCartView(true);
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">MenuMaster Food Ordering</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {localStorage.getItem("token") && (
                                    <li className="nav-item">
                                        <Badge>
                                            <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
                                        </Badge>
                                    </li>
                                )}
                            </li>
                            {localStorage.getItem("token") && (
                                <li className="nav-item">
                                    <Badge>
                                        <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder">My Orders</Link>
                                    </Badge>
                                </li>
                            )}
                        </ul>
                        {!localStorage.getItem("token") ? (
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </form>
                        ) : (
                            <div>
                                <div className="btn bg-white text-success mx-2" onClick={loadCart}>
                                    My Cart
                                    <Badge color="secondary bg-danger text--white" badgeContent={data.length || 0}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </div>

                                {cartView && (
                                    <Modal open={cartView} onClose={() => setCartView(false)}>
                                        <div className="modal-content">
                                            <Cart />
                                        </div>
                                    </Modal>
                                )}

                                <button onClick={handleLogout} className="btn bg-danger text-white">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}