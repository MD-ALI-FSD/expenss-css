const express = require("express");
const router = express.Router();
//importing controllers from 'products.js' file.
const ExpenseController = require("../controller/ExpenseController");
//middleware to validate tokenised user-id received as a header in the GET request
const userAuthentication = require("../../middleware/auth");

router.post(
  "/user/addexpense",
  userAuthentication.authenticate,
  ExpenseController.postAddExpense
);

router.put("/user/editexpense/:expenseId", ExpenseController.postEditExpense);

router.delete(
  "/user/deleteexpense/:expenseId",
  ExpenseController.postDeleteExpense
);

router.get(
  "/user/getexpense",
  userAuthentication.authenticate,
  ExpenseController.getExpense
);

module.exports = router;
