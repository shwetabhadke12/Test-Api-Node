const mongoose = require('mongoose');
const { Schema } = mongoose;

// const NestedLayoutSchema = new Schema({
//   h: Number,
//   i: String,
//   isBounded: Schema.Types.Mixed,
//   isDraggable: Schema.Types.Mixed,
//   isResizable: Schema.Types.Mixed,
//   label: String,
//   layoutSetting: Schema.Types.Mixed,
//   maxH: Schema.Types.Mixed,
//   maxW: Schema.Types.Mixed,
//   minH: Schema.Types.Mixed,
//   minW: Schema.Types.Mixed,
//   moved: Boolean,
//   name: String,
//   resizeHandles: Schema.Types.Mixed,
//   static: Boolean,
//   type: String,
//   w: Number,
//   x: Number,
//   y: Number
// });

// const LayoutSettingSchema = new Schema({
//   SectionLayout: Number
// });


const LayoutItemSchema = new mongoose.Schema({
  w: Number,
  h: Number,
  x: Number,
  y: Number,
  i: String,
  moved: Boolean,
  static: Boolean,
  isDraggable: { type: Boolean, default: true }, // If not provided, default value is true
  label: String,
  type: String,
  isRequired: Boolean,
  name: String,
  layoutSetting: {
    type: mongoose.Schema.Types.Mixed, // Store layout settings as a flexible mixed type
    default: {} // Default value is an empty object if not provided
  }
});

const MainLayoutSchema = new mongoose.Schema({
  h: Number,
  i: String,
  isBounded: Schema.Types.Mixed,
  isDraggable: Schema.Types.Mixed,
  isResizable: Schema.Types.Mixed,
  layout: Schema.Types.Mixed,
  layoutSetting: Schema.Types.Mixed,
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
  quickLayouts : [MainLayoutSchema],
  organizationId: String,
  tabName: String,
  showImageField: Boolean,
  imagePath: String,
  moduleName: String,
  BussinessCard: {
    OptionList: [OptionSchema],
    title: String,
    switchcheck: Boolean,
  },
  DetailRecord: [ItemSchema]
}, {
  versionKey: false,
  timestamps: true
})

const LayoutModel = mongoose.model('CreatFormsSchema', CreatFormsSchema);

module.exports = LayoutModel;
