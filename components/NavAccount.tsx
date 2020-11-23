import React, { useEffect, useState } from "react";
import Link from "next/link";

const NavAccount = (props) => {

  if (props.user) {
    return (
      <>
        <Link href="/account">
          <a>Account</a>
        </Link>
        <Link href="/api/logout">
          <a>Logout</a>
        </Link>
      </>
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
