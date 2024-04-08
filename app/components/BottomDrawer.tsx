import * as React from "react";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { Typography, CircularProgress, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function BottomDrawer({ flight }: { flight: string }) {
    const { isPending, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () =>
            fetch(
                "https://tdx.transportdata.tw/api/basic/v2/Air/FIDS/Airport/Departure/TPE?$orderby=ScheduleDepartureTime&$format=JSON"
            )
                .then((res) => res.json())
                .then((data) => {
                    return data.some(
                        (e) => `${e.AirlineID}${e.FlightNumber}` === flight
                    );
                }),
    });

    if (isPending)
        return (
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
            className="px-4"
        >
            {data ? (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    className="p-4"
                >
                    <CheckCircleOutlineIcon
                        style={{ fontSize: 60 }}
                        className="mb-2"
                    />
                    <Typography variant="subtitle1" gutterBottom>
                        完成送機行程
                    </Typography>
                </Box>
            ) : (
                <>
                    <Typography variant="h6" gutterBottom className="my-1">
                        查不到「{flight}」航班資訊
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        className="my-1"
                    >
                        請確認航班資訊、起飛時間等。你也可以直接同寫此航班作為接送資訊
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="my-1"
                    >
                        確認航班資訊，並送出
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="my-1"
                    >
                        重新填寫
                    </Button>
                </>
            )}
        </Box>
    );
}
