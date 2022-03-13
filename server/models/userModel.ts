import mongoose from 'mongoose';
const { Schema, model, Document } = mongoose;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


interface Users extends Document{
    username: string;
    password: string;
}

const UserSchema: Schema<Users> = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

UserSchema.pre<Users>('save',
    function (this: Users, next: (err?: Error | undefined) => void) {
        // hash password if it is new or modified
        if (!this.isModified('password')) return next();

        // generate salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err: Error, salt: any) {
            if (err) return next(err);

            // has password using salt
            bcrypt.hash(this.password, salt, function (err: Error, hash: string) {
                if (err) return next(err);

                this.password = hash;
                next();
            });
        });
    }
);

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const Users = model<Users>('users', UserSchema)

export default Users;
