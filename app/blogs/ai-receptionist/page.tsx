import { redirect } from "next/navigation";

export default function AiReceptionistPageRedirect() {
  redirect("/blogs?tab=receptionist");
}
