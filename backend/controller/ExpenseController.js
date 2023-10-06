const expenseModel = require("../models/expenseModel");

/*******************************************************/
//  POST Add-Expense Controller
/*******************************************************/
exports.postAddExpense = async (req, res, next) => {
  try {
    console.log("inside add backend");
    const amount = req.body.amount;
    const description = req.body.discription;
    const category = req.body.category;
    const id = req.user.id;

    console.log(amount, description, category);

    const data = await expenseModel.create({
      amount: amount,
      description: description,
      category: category,
      userId: id,
    });

    res.status(201).json({ newExpenseDetail: data });
  } catch (err) {
    res.status(500).json(err);
  }
  // catch (err) {
  //     res.status(500).json({ error: err });
  //   }
};

/*******************************************************/
//  GET Expense Controller
/*******************************************************/
exports.getExpense = async (req, res, next) => {
  try {
    const expenses = await expenseModel.findAll({
      where: { userId: req.user.id },
    });
    // console.log(users);
    res.status(200).json({ allExpenses: expenses });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/*******************************************************/
//  POST Delete Expense Controller
/*******************************************************/
exports.postDeleteExpense = async (req, res, next) => {
  try {
    console.log("inside post delete backend");
    const expenseId = req.params.expenseId;
    console.log(expenseId);
    await expenseModel.destroy({ where: { id: expenseId } });

    res.status(200).send("deleted succesfully");
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.postEditExpense = (req, res, next) => {
  console.log("inside post editer backend");
  const expenseId = req.params.expenseId;
  const amount = req.body.amount;
  const description = req.body.discription;
  const category = req.body.category;

  expenseModel
    .update(
      {
        amount: amount,
        description: description,
        category: category,
      },
      { where: { id: expenseId } }
    )
    .then((user) => {
      console.log("consoled updated succesfully");
      res.send("updated successfully");
    })
    .catch((err) => console.log(err.message));
};
