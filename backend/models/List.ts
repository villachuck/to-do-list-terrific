import { Schema, model, Document } from 'mongoose';

interface IList extends Document {
  task: string;
  active: boolean;
  creationDate: Date;
}

const listSchema = new Schema<IList>({
  task: { type: String, required: true },
  active: { type: Boolean, default: true },
  creationDate: { type: Date, default: Date.now }
});

export const ListModel = model<IList>('List', listSchema, 'Lists');
