import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import JerseyFront from "./JerseyFront";
import JerseyLeft from "./JerseyLeft";
import JerseyRight from "./JerseyRight";
import JerseyBack from "./JerseyBack";
import back from "../assets/jersey-images/back.png";
import front from "../assets/jersey-images/front.png";
import left from "../assets/jersey-images/left.png";
import right from "../assets/jersey-images/right.png";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ViewButtons({
  shapeColors,
  selectedNeckImage,
  selectedShoulderImage,
  selectedvorNovImg,
}) {
  const [value, setValue] = useState(0);
  const [initialRender, setInitialRender] = useState(true);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {

    //for cut or no cut selection
    if (!initialRender && selectedvorNovImg) {
      if (value === 2 && selectedvorNovImg.left) {
        setValue(2);
      } else if (value === 3 && selectedvorNovImg.right) {
        setValue(3);
      } else {
        setValue(2);
      }
    } else {
      setInitialRender(false);
    }
  }, [selectedvorNovImg]);

  // for selectedShoulderImages
  useEffect(() => {
    if (selectedShoulderImage) {
      if (
        (value === 2 || value === 3) &&
        (selectedShoulderImage.front || selectedShoulderImage.back)
      ) {
        setValue(0);
      }
    }
  }, [selectedShoulderImage]);


  // for selectedNeckImages 
  useEffect(() => {
    
    if ((selectedNeckImage) && (value !== 0)) {
      setValue(0);
    }
    
  }, [selectedNeckImage]);
  console.log(selectedNeckImage);
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}
    >
      <TabPanel value={value} index={0}>
        <JerseyFront
          shapeColors={shapeColors}
          selectedNeckImage={selectedNeckImage}
          selectedShoulderImage={selectedShoulderImage.front}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JerseyBack
          shapeColors={shapeColors}
          selectedShoulderImage={selectedShoulderImage.back}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <JerseyLeft
          shapeColors={shapeColors}
          selectedvorNovImg={selectedvorNovImg.left}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <JerseyRight
          shapeColors={shapeColors}
          selectedvorNovImg={selectedvorNovImg.right}
        />
      </TabPanel>

      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        container="true"
        spacing={2}
      >
        <Tab
          style={{ minHeight: 100 }}
          icon={<Avatar style={{ minHeight: 100, minWidth: 70 }} src={front} />}
          {...a11yProps(0)}
        />
        <Tab
          style={{ minHeight: 100 }}
          icon={<Avatar style={{ minHeight: 100, minWidth: 70 }} src={back} />}
          {...a11yProps(1)}
        />
        <Tab
          style={{ minHeight: 100 }}
          icon={<Avatar style={{ minHeight: 100, minWidth: 70 }} src={left} />}
          {...a11yProps(2)}
        />
        <Tab
          style={{ minHeight: 100 }}
          icon={<Avatar style={{ minHeight: 100, minWidth: 70 }} src={right} />}
          {...a11yProps(3)}
        />
      </Tabs>
    </Box>
  );
}
