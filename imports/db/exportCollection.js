import { Mongo } from 'meteor/mongo';

// The exports collection to store it
export const exportCollection = new Mongo.Collection('exports')