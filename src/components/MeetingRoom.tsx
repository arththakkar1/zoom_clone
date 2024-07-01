import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

function MeetingRoom() {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const searchParams=useSearchParams()
  const isPersonalRoom=!!searchParams.get('personal')
  const [showParticipants, setShowParticipants] = useState(false);
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  const {useCallCallingState}=useCallStateHooks();
  const callingState=useCallCallingState();

  if(callingState!==CallingState.JOINED)return<Loader/>

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5">
        <CallControls />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList className="text-white" size={20} />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="bg-dark-1 border-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((items, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(items.toLowerCase() as CallLayoutType);
                  }}
                >
                  {items}
                </DropdownMenuItem>
              </div>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div
            className="cursor-pointer rounded-2xl  bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
            >
                <User size={20} className="text-white"/>
            </div>
        </button>
        {!isPersonalRoom&&<EndCallButton/>}
      </div>
    </section>
  );
}

export default MeetingRoom;
