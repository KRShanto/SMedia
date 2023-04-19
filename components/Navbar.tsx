import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
// icons
import {
  FaHome,
  FaVideo,
  FaUsers,
  FaGoogleDrive,
  FaPlus,
  FaRegCommentDots,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  // close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (e.target.closest(".profile")) return;
      setShow(false);
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav>
      <Link href="/" className="logo">
        S
      </Link>

      <div className="links">
        <Link className="link" href="/">
          <FaHome />
        </Link>

        <Link className="link" href="/watch">
          <FaVideo />
        </Link>

        <Link className="link" href="/groups">
          <FaUsers />
        </Link>

        <Link className="link" href="/drive">
          <FaGoogleDrive />
        </Link>

        <Link className="link" href="/create">
          <FaPlus />
        </Link>

        <Link className="link" href="/messages">
          <FaRegCommentDots />
        </Link>

        <Link className="link" href="/notifications">
          <FaBell />
        </Link>

        <div className="profile" onClick={() => setShow(!show)}>
          <div className="img"></div>

          <div className={`dropdown ${show ? "active" : ""}`}>
            <Link className="link" href="/profile">
              <FaUserCircle />
              <p>Profile</p>
            </Link>

            <Link className="link" href="/settings">
              <FaCog />
              <p>Settings</p>
            </Link>

            {session ? (
              <button className="link" onClick={() => signOut()}>
                <FaSignOutAlt />
                <p>Logout</p>
              </button>
            ) : (
              <button className="link" onClick={() => signIn()}>
                <FaSignInAlt />
                <p>Login</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
