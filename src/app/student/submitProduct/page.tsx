"use client";

import { Upload } from "lucide-react";
import { DashboardSubmissionStatus } from "../../../components/student/submitionProducts/SubmitionProducts";
import { ProductSubmissionsTable } from "../../../components/student/submitionProducts/SubmitonTable";

function page() {
  return (
    <>
    <DashboardSubmissionStatus />
    <ProductSubmissionsTable />
    </>
  );
}

export default page;
