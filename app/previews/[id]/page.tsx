import { getLogin, logins } from "@/lib/logins";
import { PreviewClient } from "./preview-client";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return logins.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const login = getLogin(params.id);
  return {
    title: login ? `${login.name} Login — LoginCraft` : "Preview — LoginCraft",
  };
}

export default function PreviewPage({ params }: { params: { id: string } }) {
  const login = getLogin(params.id);
  if (!login) notFound();
  return <PreviewClient login={login} />;
}
