import { InitialModal } from "@/components/modals/initial-modal";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const IntialPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect(`/sign-in`);
  }

  console.log("USER: ", user);

  const server = await prismadb.server.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default IntialPage;
