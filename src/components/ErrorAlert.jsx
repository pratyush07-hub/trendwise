"use client";

import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";

export default function ErrorAlert() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "unauthorized") {
      alert("Access denied: You are not signed in or not an admin.");
      redirect("/");
    }
  }, [error]);

  return null;
}
