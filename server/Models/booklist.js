import { Schema, model } from "mongoose"

let bookCouresSchema = new Schema({
      couresName: {
         type: String,
         required: true,
         maxlength: 20,
         minlength: 3
      },
      userName: {
         type: String,
         required: true,
         maxlength: 20,
         minlength: 3   
      },
      age: {
         type: Number,
         required: true,
         max: 100,
         min: 3
      },
      email: {
         type: String,
         required: false,
         maxlength: 100,
         minlength: 3,
         unique: true,
      },
      password: {
         type: String,
         required: false,
         maxlength: 20,
         minlength: 6,
         unique: true
      },
      accountName: {
         type: String,
         required: false,
         maxlength: 20,
         minlength: 2,
         unique: true,

      }
   }
);
export default model("bookCoures", bookCouresSchema);