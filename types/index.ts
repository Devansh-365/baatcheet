import { Server, Member, User } from "@prisma/client";

export type ServerWithMembersWithUsers = Server & {
  members: (Member & { user: User })[];
};
