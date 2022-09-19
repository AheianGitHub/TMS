var User = require("../Models/userAccounts");

function editApplication(request, res) {
  var App_Acronym = request.body.App_Acronym;
  var App_Description = request.body.App_Description;
  var App_startDate = request.body.App_startDate;
  var App_endDate = request.body.App_endDate;
  var App_permit_Open = request.body.App_permit_Open;
  var App_permit_toDoList = request.body.App_permit_toDoList;
  var App_permit_Doing = request.body.App_permit_Doing;
  var App_permit_Done = request.body.App_permit_Done;
  var App_permit_Create = request.body.App_permit_Create;

  User.editApplication(
    App_Acronym,
    App_Description,
    App_startDate,
    App_endDate,
    App_permit_Open,
    App_permit_toDoList,
    App_permit_Doing,
    App_permit_Done,
    App_permit_Create,
    (err, dataHold) => {
      if (err) {
        return res.status(400).send(err);
      } else if (dataHold) {
        return res.sendStatus(200);
      } else if (!dataHold) {
        return res.sendStatus(400);
      }
    }
  );
}

module.exports = { editApplication };
