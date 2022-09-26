function SplitMultiselect(selectedGroups, column_name) {
  if (!selectedGroups) {
    return;
  }

  // console.log("Original", selectedGroups);
  var concatGroups = "";
  //map out the groups from selectedGroups
  // console.log(selectedGroups);
  selectedGroups.map(item => {
    //item.groupname to get the groupname string
    //if-else: if concatGroups not empty, do ? (add "," then groupname). else do : (add groupname)
    concatGroups =
      concatGroups != ""
        ? concatGroups + "," + item[column_name]
        : concatGroups + item[column_name];
  });
  // console.log("Completed groupname string to send fetch", concatGroups);
  return concatGroups;
}

export default SplitMultiselect;
