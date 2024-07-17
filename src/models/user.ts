import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

const schema = new Schema(
  {
    firstName: {
      type: String,
      minLength: 1,
      maxLength: 30
    },

    lastName: {
      type: String,
      minLength: 1,
      maxLength: 30
    },

    email: {
      type: String,
      required: true,
      minLength: 5,
    },

    password: {
      type: String,
      required: true
    },

  }, { timestamps: true, toJSON: { virtuals: true } }
)

export default model<IUser>('User', schema)