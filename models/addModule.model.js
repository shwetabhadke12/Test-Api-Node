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

const OptionSchema = new Schema({
  id: Number,
  name: String,
  checked: Boolean,
  name2: String
});

const ItemSchema = new mongoose.Schema({
  id: String,
  content: {
    type: mongoose.Schema.Types.Mixed 
  },
  droppable: Boolean,
  show: Boolean,
  switchshow: Boolean
});

const CreatFormsSchema = new Schema({
  sectionLayouts: [MainLayoutSchema],
  organizationId: String,
  tabName: String,
  showImageField: Boolean,
  imagePath: String,
  BussinessCard: [{
    title: String,
    switchcheck: Boolean,
    OptionList: [OptionSchema] 
  }],
  DetailRecord:[ItemSchema]
})

const MainLayoutModel = mongoose.model('CreateLayoutForms', CreatFormsSchema);

module.exports = MainLayoutModel;
