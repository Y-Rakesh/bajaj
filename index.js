import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "rakesh_yenumula";     
const DOB = "21082004";          
const EMAIL = "rakeshyenumula11@gmail.com";
const ROLL_NUMBER = "22BCE9679";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    let allAlphaStr = alphabets.join("");
    let concat_string = allAlphaStr
      .split("")
      .reverse()
      .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (error) {
    res.status(400).json({
      is_success: false,
      message: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("Full Stack API is running  ");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
