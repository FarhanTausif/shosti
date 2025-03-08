"use client";

import { useParams } from "next/navigation";
import VideoCall from "../../../components/VideoCall";

export default function RoomPage() {
  const { roomid } = useParams();

  // Generate a random userID (for example purposes)
  const userID = "user" + Math.floor(Math.random() * 10000);
  // You could also prompt the user for their name; here we use a default
  const userName = "i.e. : Alice";

  return (
    <div style={{ height: "100vh" }}>
      <VideoCall roomID={roomid} userID={userID} userName={userName} />
    </div>
  );
}
