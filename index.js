const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); 


let users = [
  { id: 1, name: "Kritika", age: 20 },
  { id: 2, name: "Vinnie", age: 22 },
];


app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    message: "All users retrieved successfully",
    data: users,
  });
});


app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

app.post("/users", (req, res) => {
  const { name, age } = req.body;


  if (!name || !age) {
    return res.status(400).json({
      success: false,
      message: "Name and age are required",
    });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    age,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
});


app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({
      success: false,
      message: "Name and age are required",
    });
  }

  user.name = name;
  user.age = age;

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});


app.patch("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const { name, age } = req.body;

  if (name) user.name = name;
  if (age) user.age = age;

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});


app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser[0],
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
