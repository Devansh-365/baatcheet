"use client";

import { CreateServerModal } from "../modals/creat-server-modal";
import { useEffect, useState } from "react";
import { CreateChannelModal } from "../modals/create-channel-model";
import { EditChannelModal } from "../modals/edit-channel-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";
import { EditServerModal } from "../modals/edit-server-modal";
import { InviteModal } from "../modals/invite-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <CreateChannelModal />
      <EditChannelModal />
      <DeleteChannelModal />
      <DeleteServerModal />
      <EditServerModal />
      <InviteModal />
    </>
  );
};
