// Mongoose Models
const BugoData = require("../models/BugoData");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");
const User = require("../models/User");

const dateType = new GraphQLScalarType({
  name: "Date",
  description: "Data Type",
  serialize: (value) => {
    const date = new Date(value);
    if (date.toString() === "invalid Date") {
      return null;
    }
    return date;
  },
});

// BugoData Type
const BugoDataType = new GraphQLObjectType({
  name: "BugoData",
  fields: () => ({
    id: { type: GraphQLID },
    latePersonName: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLString,
    },
    mourner: {
      type: GraphQLString,
    },
    funeralHall: {
      type: GraphQLString,
    },
    binso: {
      type: GraphQLString,
    },
    jangJi: {
      type: GraphQLString,
    },
    funeralAddress: {
      type: GraphQLString,
    },
    imJongDate: {
      type: dateType,
    },
    balInDate: {
      type: dateType,
    },
    accountHolder: {
      type: GraphQLString,
    },
    bankName: {
      type: GraphQLString,
    },
    accountNumber: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        console.log("패런트", parent);
        return User.findById(parent.userId);
      },
    },
    createdAt: {
      type: GraphQLString,
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    snsId: { type: GraphQLString },
    email: { type: GraphQLString },
    nickName: { type: GraphQLString },
    avatarUrl: { type: GraphQLString },
    ageRange: { type: GraphQLString },
    provider: { type: GraphQLString },
    // bugoDatas: {
    //   type: Gr BugoDataType,
    //   resolve(parent, args) {
    //     return BugoData.findById(args.id);
    //   },
    // },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    bugodatas: {
      type: new GraphQLList(BugoDataType),
      resolve(parent, args) {
        return BugoData.find();
      },
    },
    bugodata: {
      type: BugoDataType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return BugoData.findById(args.id);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    bugodatasByUser: {
      type: new GraphQLList(BugoDataType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return BugoData.find({ userId: args.id });
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBugoData: {
      type: BugoDataType,
      args: {
        latePersonName: {
          type: GraphQLNonNull(GraphQLString),
        },
        age: {
          type: GraphQLNonNull(GraphQLString),
        },
        mourner: {
          type: GraphQLNonNull(GraphQLString),
        },
        funeralHall: {
          type: GraphQLNonNull(GraphQLString),
        },
        binso: {
          type: GraphQLNonNull(GraphQLString),
        },
        funeralAddress: {
          type: GraphQLNonNull(GraphQLString),
        },
        jangJi: {
          type: GraphQLString,
        },
        imJongDate: {
          type: GraphQLNonNull(dateType),
        },
        balInDate: {
          type: GraphQLNonNull(dateType),
        },
        accountHolder: {
          type: GraphQLNonNull(GraphQLString),
        },
        bankName: {
          type: GraphQLNonNull(GraphQLString),
        },
        accountNumber: {
          type: GraphQLNonNull(GraphQLString),
        },
        userId: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const bugoData = new BugoData({
          latePersonName: args.latePersonName,
          age: args.age,
          mourner: args.mourner,
          funeralHall: args.funeralHall,
          binso: args.binso,
          jangJi: args.jangJi,
          funeralAddress: args.funeralAddress,
          imJongDate: args.imJongDate,
          balInDate: args.balInDate,
          accountHolder: args.accountHolder,
          bankName: args.bankName,
          accountNumber: args.accountNumber,
          userId: args.userId,
        });
        return bugoData.save();
      },
    },
    updateBugoData: {
      type: BugoDataType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        latePersonName: { type: GraphQLString },
        age: { type: GraphQLString },
        mourner: { type: GraphQLString },
        funeralHall: { type: GraphQLString },
        binso: { type: GraphQLString },
        funeralAddress: { type: GraphQLString },
        jangJi: { type: GraphQLString },
        imJongDate: { type: dateType },
        balInDate: { type: dateType },
        accountHolder: { type: GraphQLString },
        bankName: { type: GraphQLString },
        accountNumber: { type: GraphQLString },
      },
      resolve(parent, args) {
        return BugoData.findByIdAndUpdate(
          args.id,
          {
            $set: {
              latePersonName: args.latePersonName,
              age: args.age,
              mourner: args.mourner,
              funeralHall: args.funeralHall,
              binso: args.binso,
              funeralAddress: args.funeralAddress,
              jangJi: args.jangJi,
              imJongDate: args.imJongDate,
              balInDate: args.balInDate,
              accountHolder: args.accountHolder,
              bankName: args.bankName,
              accountNumber: args.accountNumber,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
