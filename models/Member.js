import mongoose from "mongoose";
import Depto from "./Depto.js";
import Role from "./Role.js";

// const Member = mongoose.model('Member', {
//     name: String,
//     email: String,
//     password: String,
//     birthday: Date,
//     depto: Depto,
//     role: Role
// });

// export default Member;

const MemberSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  birthday: { type: Date },
  depto: [{ type: mongoose.Schema.Types.ObjectId, ref: "Depto" }],
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

const Member = mongoose.model("Member", MemberSchema);

export default Member;
