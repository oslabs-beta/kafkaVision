import mongoose from 'mongoose';
const { Schema, model, Document } = mongoose;
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;
interface Users extends Document{
  username: string;
  password: string;
  kafkaClusters: string[];
  prometheusClusters: string[];
  validatePassword(password: string): boolean;
}

const UserSchema = new Schema<Users>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  kafkaClusters: {
    type: [String],
    required: false,
    unique: true,
  },
  prometheusClusters: {
    type: [String],
    required: false,
    unique: true,
  }
});

UserSchema.pre('save',
  async function (next: (err?: Error | any) => void) {
  const thisObj = this as Users;
  if (!this.isModified('password')) {
      return next();
  };
  try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      thisObj.password = await bcrypt.hash(thisObj.password, salt);
      return next();
  } catch (err) {
      return next(err);
  };
});

UserSchema.methods.validatePassword = async function (pass: string) {
  return bcrypt.compare(pass, this.password);
};

const Users = model<Users>('users', UserSchema)

export default Users;
