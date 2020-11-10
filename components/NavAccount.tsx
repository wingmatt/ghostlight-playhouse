import React from "react";
import Link from "next/link";

const checkLoginStatus = () => {
  if (
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("a0:session="))
  ) {
    return true;
  }
  return false;
};

const NavAccount = () => {
  const isLoggedIn: boolean = checkLoginStatus();
  if (isLoggedIn) {
    return (
      <Link href="/api/logout">
        <a>Logout</a>
      </Link>
    );
  } else {
    return (
      <Link href="/api/login">
        <a>Login</a>
      </Link>
    );
  }
};

export default NavAccount;
