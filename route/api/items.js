const { Router } = require("express");
const router = Router();
const Item = require("../../model/Item");
const auth = require("../../middleware/Auth");

//@route          GET /api/items
//@description    find items
//@access         public
router.get("/", async (req, res, next) => {
  try {
    await res.json(await Item.find());
  } catch (err) {
    next(err);
  }
});

//@route          POST /api/items
//@description    add new item
//@access         public
router.post("/", auth, async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422);
    }
    next(err);
  }
});
//@route          PUT /api/items
//@description    edit item amount
//@access         public
router.put("/:id", auth, async (req, res, next) => {
  try {
    await Item.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true
    });
    res.json(await Item.findById(req.params.id));
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422);
    }
    next(err);
  }
});

//@route          DELETE /api/items
//@description    delete item
//@access         public
router.delete("/:id", auth, async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
