"use client";

import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

export default function FetchDeparture() {
    const { isPending, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () =>
            fetch(
                "https://tdx.transportdata.tw/api/basic/v2/Air/FIDS/Airport/Departure/TPE?$orderby=ScheduleDepartureTime&$format=JSON"
            ).then((res) => res.json()),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    console.log(data);
}
