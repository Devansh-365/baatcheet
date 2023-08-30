import { InitialModal } from "@/components/modals/initial-modal";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const IntialPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect(`/sign-in`);
  }

  return <InitialModal />;
};

export default IntialPage;
