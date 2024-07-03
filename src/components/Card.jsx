import React, { useEffect, useState } from "react";
import { FetchData } from "../Utils/FetchData";
import { Stack, Box } from "@mui/material";

const Card = ({ city }) => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        try {
          const data = await FetchData(city);
          setReport(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setReport(null);
        }
      }
    };

    fetchData();
  }, [city]);

  return (
    <Stack alignItems="center" justifyContent="center">
      {report ? (
        <Box
          justifyContent="center"
          height="600px"
          width="500px"
          border="2px solid #000" /* Example border color */
          borderRadius="5px"
          mt="50px"
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <h2>{report.location.name}</h2>
          <img
            src={report.current.condition.icon}
            alt={report.current.condition.text}
            style={{ width: "100px", height: "100px" }}
          />
          <p>Temperature: {report.current.temp_c}°C</p>
          <p>Condition: {report.current.condition.text}</p>
          <p>Humidity: {report.current.humidity}%</p>
          <p>Wind: {report.current.wind_kph} km/h</p>
        </Box>
      ) : (
        <Stack alignItems="center" justifyContent="center" mt="300px">
          <Box fontSize="50px">Type something for search</Box>
        </Stack>
      )}
    </Stack>
  );
};

export default Card;
