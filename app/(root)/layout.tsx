"use client";
import React from "react";
import { useEffect } from "react";
import { isUserLogged } from "@/redux/actions";
import { useAppDispatch } from "@/redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isUserLogged());
  }, [dispatch]);

  return (
    <main className="root">
      <div className="root-container">
        <div className="wrapper mb-16">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
