import React, { useEffect, useState } from "react";
import Link from "next/link";

const NavAccount = (props) => {

  if (props.user) {
    return (
      <>
        <a href="/account">Account</a>
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
