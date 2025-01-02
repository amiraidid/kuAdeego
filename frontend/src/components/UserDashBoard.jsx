import { jwtDecode } from "jwt-decode";
import React from "react";
import { Link } from "react-router-dom";


function UserDashBoard({show, handleSignOut}) {

  const token = sessionStorage.getItem("token")
  const decoded = jwtDecode(token)


  return (
    <div className="z-[100]">
      <div
        className={`z-50 ${show ? "block" : "hidden"} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            {decoded.user}
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            {decoded.email}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <Link
              to={"/dashboard"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              to={"/checkouts"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Checkouts
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="w-full flex flex-col items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserDashBoard;
