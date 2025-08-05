import express from "express";

const app = express();

const PORT = process.env.PORT || 1011;

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
