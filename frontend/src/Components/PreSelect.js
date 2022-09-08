function PreSelect(tempGroupname, setPreSelectedGroups) {
  if (tempGroupname) {
    var multiselectHolder = tempGroupname
      .split(",")
      .map(group => ({ groupname: group.trim() }));

    // setPreSelectedGroups(multiselectHolder);
    return multiselectHolder;
  }
}

export default PreSelect;
