// models/MainLayoutModel.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const NestedLayoutSchema = new Schema({
  h: Number,
  i: String,
  isBounded: Schema.Types.Mixed,
  isDraggable: Schema.Types.Mixed,
  isResizable: Schema.Types.Mixed,
  label: String,
  layoutSetting: Schema.Types.Mixed,
  maxH: Schema.Types.Mixed,
  maxW: Schema.Types.Mixed,
  minH: Schema.Types.Mixed,
  minW: Schema.Types.Mixed,
  moved: Boolean,
  name: String,
  resizeHandles: Schema.Types.Mixed,
  static: Boolean,
  type: String,
  w: Number,
  x: Number,
  y: Number
});

const LayoutSettingSchema = new Schema({
  SectionLayout: Number
});

const MainLayoutSchema = new Schema({
  h: Number,
  i: String,
  isBounded: Schema.Types.Mixed,
  isDraggable: Schema.Types.Mixed,
  isResizable: Schema.Types.Mixed,
  layout: [NestedLayoutSchema],
  layoutSetting: LayoutSettingSchema,
  maxH: Schema.Types.Mixed,
  maxW: Schema.Types.Mixed,
  minH: Schema.Types.Mixed,
  minW: Schema.Types.Mixed,
  moved: Boolean,
  resizeHandles: Schema.Types.Mixed,
  sectionName: String,
  static: Boolean,
  w: Number,
  x: Number,
  y: Number
});

const CreatFormsSchema = new Schema({
  sectionLayouts: [MainLayoutSchema],
  organizationId: String,
  tabName: String,
  showImageField: Boolean,
  imagePath: String
})

const MainLayoutModel = mongoose.model('CreateLayoutForms', CreatFormsSchema);

module.exports = MainLayoutModel;
