import React from "react";
import {
  CheckboxGroup,
  Checkbox,
  Stack,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import * as sc from "../skin_conditions";

function SkinConditionSelection({handleCheckboxChange}) {
  const maxRowsPerColumnCommon = 5;
  const maxRowsPerColumnOther = 9;

  // This function just simplifies how we arrange the Stack
  // of checkboxes. We aim to have 5 checkboxes in each column
  //
  // This is a little more complicated for how simple the idea is.
  // By separating our conditions into a map, each key will map
  // to a list of conditions. All the conditions in this list
  // Will be in a single column.
  // The next key (index) will start a new column
  const getMainConditions = (conditions) => {
    const stackGroup = {};
    var index = 0;
    conditions.map((condition, i) => {
      // Each index the map will map to a list of 5 Checkbox elements
      // We need to default the list if we're on a new key
      if (stackGroup[index] === undefined) {
        stackGroup[index] = [];
      }

      const displayValue = sc.mainSkinConditionToDisplay[condition];
      stackGroup[index].push(
        <Checkbox key={i + ':' + displayValue} value={condition} onChange={handleCheckboxChange}>{displayValue}</Checkbox>,
      );

      // Each Stack (column) should contain 5 Values to check
      if ((i + 1) % maxRowsPerColumnCommon == 0) {
        index += 1;
      }
    });

    return stackGroup;
  };

  // Filters the other conditions by removing "other" from the
  // string and then formatting it. Then applies the
  // Value and Display Text to a Checkbox element
  //
  // Will keep the correct value when we need to pass it off to the
  // backend server for the model
  const getOtherConditions = (otherConditions) => {
    const stackGroup = {};
    var index = 0;

    otherConditions.map((condition, i) => {
      // Remove "other"
      const trimmedString = condition.replace("other", "");

      // Replace all numbers with a space or comma and remove any spaces at the end
      const spaceTrimmed = trimmedString
        .replaceAll("20", " ")
        .replaceAll("2c", ",")
        .replaceAll("27", "'")
        .replaceAll("3b", ":")
        .replaceAll("28", "")
        .replaceAll("29", "")
        .replace(/\s+$/, "");

      // Upper Case the first letter of each word
      const formattedString = spaceTrimmed
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");

      if (stackGroup[index] === undefined) {
        stackGroup[index] = [];
      }

      stackGroup[index].push(
        <Checkbox key={i + '-' + formattedString} value={condition} onChange={handleCheckboxChange}>{formattedString}</Checkbox>,
      );

      // Each Stack (column) should contain max row Values to check
      if ((i + 1) % maxRowsPerColumnOther == 0) {
        index += 1;
      }
    });

    return stackGroup;
  };

  const mainConditions = getMainConditions(sc.mainSkinConditionValues);
  const otherConditions = getOtherConditions(sc.otherSkinConditions);

  const otherTabs = [];
  const maxColumnsPerTab = 3;
  const totalColumns = Object.keys(otherConditions).length;

  const getOtherPanels = () => {
    const panels = [];
    let index = 1;

    // Some logic to divide the other conditions
    // among the different tabs evenely
    for (let i = 0; i < totalColumns; i += maxColumnsPerTab) {
      otherTabs.push(<Tab key={i + index}>{`Page ${index}`}</Tab>);

      const valuesToUse = [];
      for (let j = 0; j < maxColumnsPerTab; j++) {
        if (i + j >= totalColumns) break;
        valuesToUse.push(otherConditions[i + j]);
      }

      panels.push(
        <TabPanel>
          <div key={i} className="flex justify-center">
            <CheckboxGroup colorScheme="green">
              <Stack direction={["row"]}>
                {valuesToUse.map((checkboxes, i) => {
                  return (
                    <Stack key={i} spacing={[1, 5]} direction={["column"]}>
                      {checkboxes.map((checkbox) => checkbox)}
                    </Stack>
                  );
                })}
              </Stack>
            </CheckboxGroup>
          </div>
        </TabPanel>,
      );

      index++;
    }

    return panels;
  };

  return (
    <div className="flex flex-col my-5 w-full space-y-3 items-center">
      <h1 className="text-xl text-black font-semibold">Skin Conditions</h1>
      <Tabs align="center">
        <TabList>
          <Tab>Common</Tab>
          {otherTabs}
        </TabList>
        <TabPanels align="left">
          {/* Panel #1 Content (Common) */}
          <TabPanel>
            <div className="flex justify-center">
              <CheckboxGroup colorScheme="green">
                <Stack direction={["row"]}>
                  {Object.values(mainConditions).map((checkboxes, i) => {
                    return (
                      <Stack key={i} spacing={[1, 5]} direction={["column"]}>
                        {checkboxes.map((checkbox) => checkbox)}
                      </Stack>
                    );
                  })}
                </Stack>
              </CheckboxGroup>
            </div>
          </TabPanel>
          {/* Other Panel Content */}
          {getOtherPanels()}
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default SkinConditionSelection;
