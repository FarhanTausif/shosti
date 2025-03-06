"use client";

import { useEffect, useRef } from "react";

export default function VideoCall({ roomID, userID, userName }) {
  const zegoInstanceRef = useRef(null);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    (async () => {
      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");

      const appID = 1519959050; // Your valid AppID (number)
      const serverSecret = "677daadae0ee12286263a74250a07927"; // Your valid ServerSecret (string)

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

    //   console.log("Generated kit token:", kitToken);

      if (!hasJoinedRef.current) {
        if (!zegoInstanceRef.current) {
          zegoInstanceRef.current = ZegoUIKitPrebuilt.create(kitToken);
        }
        zegoInstanceRef.current.joinRoom({
          container: document.getElementById("video-container"),
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
        });
        hasJoinedRef.current = true;
      }
    })();
  }, [roomID, userID, userName]);

  return (
    <div
      id="video-container"
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
