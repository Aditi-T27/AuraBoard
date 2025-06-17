import { Suspense } from "react";
import React from "react";
import Dashboard from "@/components/custom/Dashboard";

export default function DashboardPage(){
  return(
  <Suspense>
    <Dashboard/>
  </Suspense>
  )
}
