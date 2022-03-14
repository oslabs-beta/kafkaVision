import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface Sessions {
    username: string;
    createdAt: Date;
}

const SessionSchema: Schema<Sessions> = new Schema({
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const Session = model<Sessions>('Session', SessionSchema);

export default Session;
