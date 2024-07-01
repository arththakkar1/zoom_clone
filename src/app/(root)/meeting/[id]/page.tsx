"use client"
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { useGetCallById } from "../../../../../hooks/useGetCallById";
import Loader from "@/components/Loader";

export default function page({ params:{id} }: { params: { id: string } }) {
  
  const {user, isLoaded}=useUser()
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const {call,isCallLoading}=useGetCallById(id)

  if(!isLoaded||isCallLoading)return<Loader/>

  return (
    <main className="h-screan w-full">
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupComplete?(
              <MeetingSetup
              setIsSetupComplete={setIsSetupComplete}
              />
            ):(
              <MeetingRoom/>
            )}
          </StreamTheme>
        </StreamCall>
    </main>
  );
}
